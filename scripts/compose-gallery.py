from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT.parent / "gallery-raw"
OUT = ROOT / "submission" / "gallery"
OUT.mkdir(parents=True, exist_ok=True)
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
LABELS = [
    ("hero", "A marked crossing can still be hidden", "The first screen introduces the specific visibility problem and launches the working model."),
    ("simulator-default", "The crossing with little room to stop", "At 25 mph and a 12 m van setback, the disclosed model calculates a 31.5 m shortfall."),
    ("simulator-safer", "Change the street; change the result", "At 15 mph and a 35 m van setback, the model calculates 19.7 m of room before the crossing."),
    ("method", "Three distances, shown separately", "The page explains first continuous visibility, reaction travel and braking travel."),
    ("evidence", "The formula and its limits are visible", "FHWA design parameters and the model's simplifying assumptions are stated on the page."),
]

for stem, title, caption in LABELS:
    source = Image.open(RAW / f"{stem}.png").convert("RGB")
    canvas = Image.new("RGB", (1500, 1000), "#F4F1EA")
    max_w, max_h = 1500, 900
    scale = min(max_w / source.width, max_h / source.height)
    source = source.resize((round(source.width * scale), round(source.height * scale)), Image.Resampling.LANCZOS)
    x = (1500 - source.width) // 2
    y = (900 - source.height) // 2
    canvas.paste(source, (x, y))
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 900, 1500, 1000), fill="#171A19")
    draw.rectangle((45, 927, 78, 931), fill="#C65A36")
    title_font = ImageFont.truetype(FONT, 24)
    body_font = ImageFont.truetype(FONT, 17)
    draw.text((95, 911), title, font=title_font, fill="#F4F1EA")
    draw.text((95, 949), caption, font=body_font, fill="#D8D4CA")
    canvas.save(OUT / f"{stem}.png", optimize=True)

Image.open(OUT / "hero.png").save(OUT / "thumbnail.png", optimize=True)
print(f"Wrote {len(LABELS)} captioned screenshots and a thumbnail to {OUT}")
