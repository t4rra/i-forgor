# Fixing Davinci Resolve (18.6) Gamma Shift on Mac
This is a known problem plaguing mac users of Davinci Resolve. When exporting, the output file has a gamma shift as compared to the preview inside of Resolve.

## Steps
1. In `File` > `project settings` > `Color Management` > `Color Space % Transform`, set:
    - Color Science: `Davinci YRGB`
    - Timeline color space: `Rec. 709-A`
    - Output Color space: `Same as Timeline`
2. In `Davinci Resolve` > `Preferences` > `General`, make sure the following are ticked:
    - `Use Mac display color profiles for viewers`
    - `Automatically Tag Rec.709 Scene clips as Rec.709-A`
