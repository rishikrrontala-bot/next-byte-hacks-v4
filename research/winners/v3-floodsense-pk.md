# FloodSense-PK — Next Byte Hacks V3, First Place Overall

**Submission:** https://devpost.com/software/floodsense-pk-bc6f3n  
**Event gallery:** https://next-byte-hacks-v3.devpost.com/project-gallery  
**Demo embedded on submission:** https://www.youtube.com/watch?v=iGv6QVicSSQ  
**Verification:** The submission page loaded and explicitly states “Winner First Place Overall.” Its YouTube iframe was visible, but the video could not be loaded; duration, opening 15 seconds, narration, and what actually worked in the recording are unverified.

## Pitch and visible work

The page opens with the problem of Pakistan's monsoon floods and the gap in optical satellite coverage during heavy clouds. It describes a radar based flood map from Sentinel-1 imagery, a comparison with the 2010 floods, live river station readings, downstream forecasts, and alerts. The described stack includes a U-Net model, Google Earth Engine, a FastAPI backend, a React console, a Streamlit dashboard, and a Flet mobile app. The authors state a validation IoU of 0.5503, but that result was not independently reproduced here.

## Judge-facing moment

**Inferred from the submission, not the unviewed demo:** show a flood detection through monsoon cloud cover, compare it with the historic flood, and turn it into a local warning. The narrative ties the technical method directly to a time-sensitive, human consequence.

## Transferable signal

The project leads with a sharply defined failure of an existing method, then shows what the new method makes visible. Its broad technical scope should not be treated as the minimum scope required to place: V3's third-place project used a much smaller in-browser prototype.
