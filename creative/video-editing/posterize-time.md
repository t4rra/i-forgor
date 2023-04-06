# Posterize Time in Davinci Resolve Fusion
Sometimes you don't want smooth animations

basically stole [this](https://forum.blackmagicdesign.com/viewtopic.php?f=21&t=92658#p515531) forum post

## Steps
1. insert `TimeStretcher` node right before the `MediaOut` node
2. set the `source time` value to the expression `floor(time/2)*2`
    1. `fps/[target fps] = [expression value]`
    2. ex: `24/10 = 2.4`, so if i want 10fps on a 24fps timeline, i would put `floor(time/2.4)*2.4`
