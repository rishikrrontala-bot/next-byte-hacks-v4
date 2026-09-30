"""Generate file-only synthetic narration and encode the actual browser capture.

Requires macOS say and Python imageio-ffmpeg. No audio is played to speakers.
"""
from pathlib import Path
import re
import subprocess
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT.parent / "demo-audio"
WORK.mkdir(parents=True, exist_ok=True)
VIDEO = ROOT / "submission" / "video"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SEGMENTS = [
    (1.5, "Here, thirty-one point five metres short. Give the crossing more room, and nineteen point seven metres remain."),
    (10.5, "The painted crossing is easy to see. A person waiting beside a parked vehicle may not be. Sightline makes that missing view visible."),
    (23.0, "This educational street model has one approaching driver, one waiting pedestrian, and one parked van. Two controls change the view and the stopping distance."),
    (34.5, "First, lower speed from twenty-five to fifteen miles per hour. Stopping distance shrinks, but the view does not change. The model still comes up eight point six metres short."),
    (49.5, "Now move the van farther back. View rises to forty-three point one metres. Stopping needs twenty-three point four. The remaining margin is nineteen point seven metres."),
    (64.5, "The dashed line shows sight. White marks travel before braking. Orange marks braking travel. The diagram and the result come from the same calculation."),
    (77.5, "Sightline keeps three distances separate: where the person stays visible, how far the vehicle travels during reaction, and how far it travels while braking."),
    (90.5, "The stopping calculation uses Federal Highway Administration design assumptions: two point five seconds for reaction, and three point four metres per second squared for deceleration."),
    (102.5, "This is an educational model, with no field validation or user study. It explains a relationship, and cannot certify a crossing safe."),
]

clips = []
cues = ["WEBVTT", ""]
def timestamp(seconds):
    millis = round(seconds * 1000)
    return f"{millis // 3600000:02}:{millis // 60000 % 60:02}:{millis // 1000 % 60:02}.{millis % 1000:03}"

for i, (start, line) in enumerate(SEGMENTS):
    clip = WORK / f"voice-{i:02}.aiff"
    subprocess.run(["say", "-v", "Samantha", "-r", "195", "-o", str(clip), line], check=True)
    probe = subprocess.run([FFMPEG, "-i", str(clip), "-f", "null", "-"], capture_output=True, text=True, check=True)
    match = re.search(r"Duration: (\d+):(\d+):([\d.]+)", probe.stderr)
    if not match:
        raise RuntimeError(f"Cannot measure {clip}")
    duration = int(match[1]) * 3600 + int(match[2]) * 60 + float(match[3])
    end = SEGMENTS[i + 1][0] if i + 1 < len(SEGMENTS) else 111
    if start + duration > end:
        raise RuntimeError(f"Narration {i} overlaps: {duration}s available {end-start}s")
    clips.append(clip)
    cues.extend([f"{timestamp(start)} --> {timestamp(start + duration)}", line, ""])
    print(f"Narration {i}: {start:.1f}s + {duration:.2f}s", flush=True)

command = [FFMPEG, "-y", "-i", str(ROOT.parent / "demo-recording" / "demo-raw.webm")]
for clip in clips:
    command += ["-i", str(clip)]
filters = [f"[{i + 1}:a]adelay={int(start * 1000)}:all=1[a{i}]" for i, (start, _) in enumerate(SEGMENTS)]
filters.append("".join(f"[a{i}]" for i in range(len(clips))) + f"amix=inputs={len(clips)}:duration=longest:normalize=0,apad,atrim=0:112[a]")
command += ["-filter_complex", ";".join(filters), "-map", "0:v:0", "-map", "[a]", "-vf", "scale=1920:1080:flags=lanczos", "-c:v", "libx264", "-preset", "medium", "-crf", "25", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", "-t", "112", str(VIDEO / "demo.mp4")]
subprocess.run(command, check=True)
(VIDEO / "demo.vtt").write_text("\n".join(cues))
print(f"Saved {VIDEO / 'demo.mp4'}")
