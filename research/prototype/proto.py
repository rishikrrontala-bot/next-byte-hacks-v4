import numpy as np, re, sys
from scipy.signal import butter, sosfiltfilt
from scipy.signal.windows import tukey

G = 9.80665

def read_at2(p):
    lines = open(p).read().splitlines()
    npts, dt = lines[3].split()[:2]
    vals = np.array(" ".join(lines[4:]).split(), float)
    return float(dt), vals[: int(npts)]

def read_v1(p):
    txt = open(p).read().splitlines()
    chans = {}
    i = 0
    while i < len(txt):
        m = re.match(r"\s*(\d+) Accelerogram points at (\d+) pts/sec", txt[i])
        if m:
            n, sps = int(m.group(1)), int(m.group(2))
            # find channel name above
            name = None
            for j in range(i, max(0, i - 40), -1):
                mm = re.match(r"Chan\s+\d+:\s*(.+?)\s*$", txt[j])
                if mm:
                    name = mm.group(1); break
            vals = []
            k = i + 1
            while len(vals) < n:
                line = txt[k]
                vals += [float(line[c:c+9]) for c in range(0, len(line.rstrip()), 9) if line[c:c+9].strip()]
                k += 1
            chans[name] = (1.0 / sps, np.array(vals[:n]))
            i = k
        else:
            i += 1
    return chans

def process(dt, a, fl=0.1, fh=25.0):
    a = a - a.mean()
    t = np.arange(len(a)) * dt
    a = a - np.polyval(np.polyfit(t, a, 1), t)
    a = a * tukey(len(a), 0.05)
    sos = butter(4, [fl, fh], btype="band", fs=1 / dt, output="sos")
    a = sosfiltfilt(sos, a)
    return a

def trim(dt, a, lo=0.001, hi=0.999, pad=3.0):
    ia = np.cumsum(a**2); ia /= ia[-1]
    i0 = max(0, np.searchsorted(ia, lo) - int(pad / dt)); i1 = min(len(a), np.searchsorted(ia, hi) + int(pad / dt))
    return a[i0:i1]

def site(dt, a, H=40.0, vs=80.0, xi=0.03, rho=1.3, vr=800.0, rhor=2.2, xir=0.01):
    n = 1 << int(np.ceil(np.log2(len(a) * 2)))
    A = np.fft.rfft(a, n)
    f = np.fft.rfftfreq(n, dt); w = 2 * np.pi * f
    vss = vs * np.sqrt(1 + 2j * xi); vrs = vr * np.sqrt(1 + 2j * xir)
    k = w / vss
    alpha = rho * vss / (rhor * vrs)
    Hf = 1 / (np.cos(k * H) + 1j * alpha * np.sin(k * H))
    return np.fft.irfft(A * Hf, n)[: len(a)]

def building(N, T1, ag, dt, zeta=0.05, theta_y=0.006, r=0.03, h=3.5, sub=4):
    m = 1.0
    w1 = 2 * np.pi / T1
    k = m * (w1 / (2 * np.sin(np.pi / (2 * (2 * N + 1))))) ** 2
    fy = k * theta_y * h  # story yield shear
    # damping: Rayleigh on modes 1 and 2 (uniform shear building)
    w2 = w1 * np.sin(3 * np.pi / (2 * (2 * N + 1))) / np.sin(np.pi / (2 * (2 * N + 1)))
    a0 = zeta * 2 * w1 * w2 / (w1 + w2); a1 = zeta * 2 / (w1 + w2)
    # initial stiffness matrix (tridiagonal)
    K = np.zeros((N, N))
    for i in range(N):
        K[i, i] += k
        if i + 1 < N:
            K[i, i] += k; K[i, i+1] -= k; K[i+1, i] -= k
    C = a0 * m * np.eye(N) + a1 * K
    h_dt = dt / sub
    u = np.zeros(N); v = np.zeros(N)
    # bilinear story springs (kinematic hardening, two-surface)
    fs = np.zeros(N); dprev = np.zeros(N)
    maxdrift = np.zeros(N)
    collapsed_at = None
    for step in range(len(ag) - 1):
        for s in range(sub):
            frac = s / sub
            agi = (ag[step] * (1 - frac) + ag[step + 1] * frac) * G
            d = np.diff(np.concatenate([[0.0], u]))
            dd = d - dprev
            ftrial = fs + k * dd
            # backbone bounds
            upper = fy * (1 - r) + r * k * d
            lower = -fy * (1 - r) + r * k * d
            fs = np.clip(ftrial, lower, upper)
            dprev = d
            fint = fs.copy(); fint[:-1] -= fs[1:]
            acc = (-m * agi - C @ v - fint) / m
            v = v + acc * h_dt
            u = u + v * h_dt
        dr = np.abs(np.diff(np.concatenate([[0.0], u]))) / h
        maxdrift = np.maximum(maxdrift, dr)
        if collapsed_at is None and dr.max() > 0.04:
            collapsed_at = step * dt
    return maxdrift.max(), collapsed_at

def ta(N, h=3.5):
    hft = N * h / 0.3048
    return 0.016 * hft ** 0.9

if __name__ == "__main__":
    recs = {}
    dt, a = read_at2("NIS090.AT2"); recs["Kobe NIS090"] = (dt, a)
    for fn in ["CICCC.RAW", "CICLC.v1", "CITOW2.RAW"]:
        for ch, (dt, a) in read_v1(fn).items():
            if ch != "Up":
                recs[f"{fn[:5]} {ch}"] = (dt, a)
    floors = [3, 6, 9, 12, 15, 20, 30]
    for mode in ["0.1N", "1.4Ta"]:
        print("== period model", mode)
        for name, (dt, a) in recs.items():
            ap = trim(dt, process(dt, a))
            for s in ["rock", "soft"]:
                ag = ap if s == "rock" else site(dt, ap)
                row = []
                for N in floors:
                    T = 0.1 * N if mode == "0.1N" else 1.4 * ta(N)
                    md, col = building(N, T, ag, dt)
                    row.append(f"{N}:{md*100:4.1f}{'X' if col is not None else ' '}")
                print(f"{name:18s} {s:4s} PGA={np.abs(ag).max():.2f}g dur={len(ag)*dt:5.1f}s | " + " ".join(row))
