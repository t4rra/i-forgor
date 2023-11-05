# fusion macros
guide to creating fusion macros

## creating custom controls
1. right-click on node and select `Edit Controls`
2. create new control or edit existing control
3. connect other controls to custom control, or whatever else you want to do

## add comment/info text
1. add `LabelControl` under `Number` type
2. name it whatever you want
3. untick the `Show Arrow` box

## adding a web link
1. add `ButtonControl` input control (under `Number` type)
2. set name/ID to wha
3. uncheck `Animatable`
4. under `Execute:` add

   ```
   os.execute('open https://[YOUR LINK HERE]/') os.execute('start https://[YOUR LINK HERE]/')
   ```
> ⚠️ Use with caution! Whatever inside `os.execute()` will be run by the OS' shell.
>
> There's two `os.execute` commands to account for the differences in operating systems. 
