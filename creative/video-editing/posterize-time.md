# Posterize Time in Davinci Resolve Fusion
Sometimes you don't want smooth animations

basically stole [this](https://forum.blackmagicdesign.com/viewtopic.php?f=21&t=92658#p515531) forum post

## Steps
1. insert `TimeStretcher` node right before the `MediaOut` node
2. set the `source time` value to the expression `floor(time/2)*2`
    1. `fps/[target fps] = [expression value]`
    2. ex: `24/10 = 2.4`, so if i want 10fps on a 24fps timeline, i would put `floor(time/2.4)*2.4`

## Premade node
Just copy code below, paste into fusion's node panel
```
{
	Tools = ordered() {
		PosterizeTime = MacroOperator {
			CtrlWZoom = false,
			CustomData = {
				Path = {
					Map = {
						["Setting:"] = "Macros:\\"
					}
				},
			},
			Inputs = ordered() {
				MainInput1 = InstanceInput {
					SourceOp = "TimeStretcher1_1",
					Source = "Input",
				},
				Input1 = InstanceInput {
					SourceOp = "TimeStretcher1_1",
					Source = "FPS",
					Default = 10,
				}
			},
			Outputs = {
				MainOutput1 = InstanceOutput {
					SourceOp = "TimeStretcher1_1",
					Source = "Output",
				}
			},
			ViewInfo = GroupInfo { Pos = { 385, 49.5 } },
			Tools = ordered() {
				TimeStretcher1_1 = TimeStretcher {
					CtrlWZoom = false,
					CtrlWShown = false,
					Inputs = {
						SourceTime = Input {
							SourceOp = "TimeStretcher1_1SourceTime",
							Source = "Value",
							Expression = "floor(time/(comp:GetPrefs(\"Comp.FrameFormat.Rate\")/FPS))*(comp:GetPrefs(\"Comp.FrameFormat.Rate\")/FPS)\n",
						},
						InterpolateBetweenFrames = Input { Value = 0, },
						SampleSpread = Input { Disabled = true, },
						FPS = Input { Value = 6, }
					},
					ViewInfo = OperatorInfo { Pos = { 0, 8.75758 } },
					UserControls = ordered() {
						FPS = {
							INP_MaxAllowed = 1000000,
							INP_Integer = true,
							INPID_InputControl = "SliderControl",
							INP_MaxScale = 60,
							INP_Default = 10,
							INP_MinScale = 1,
							INP_MinAllowed = 1,
							LINKID_DataType = "Number",
							LINKS_Name = "FPS",
						}
					}
				},
				TimeStretcher1_1SourceTime = BezierSpline {
					SplineColor = { Red = 233, Green = 217, Blue = 243 },
					CtrlWZoom = false,
					NameSet = true,
					KeyFrames = {
						[9] = { 0, Flags = { Linear = true } }
					}
				}
			},
		}
	}
}
```
