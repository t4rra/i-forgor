# Cura Start/End G-Code
```
; START GCODE
M220 S100 ;Reset Feedrate
M221 S100 ;Reset Flowrate

G28 ;Home
M190 S{material_bed_temperature_layer_0} ; Set bed temperature and wait
M104 S{material_print_temperature_layer_0} ; Set hotend temp and continue
; PRTOUCH_PROBE_ZOFFSET
STATUS_MESHING
BED_MESH_CALIBRATE ADAPTIVE=1

G92 E0 ;Reset Extruder
G1 Z2.0 F3000 ;Move Z Axis up
G1 X5 Y20 Z0.28 F5000.0 ;Move to start position

M109 S{material_print_temperature_layer_0} ; Set hotend temperature and wait

G1 X5 Y100.0 Z0.28 F1500.0 E15 ;Draw the first line
G92 E0 ;Reset Extruder
G1 E-1.0000 F1800 ;Retract a bit
G1 Z2.0 F3000 ;Move Z Axis up
G1 E0.0000 F1800
```

```
; END GCODE
G91 ;Relative positioning
G1 E-2 F2700 ;Retract a bit
G1 E-2 Z1 F2400 ;Retract and raise Z
G1 X5 Y5 F3000 ;Wipe out
G1 Z10 ;Raise Z more
G90 ;Absolute positioning

G1 X0 Y{machine_depth} ;Present print
M106 S0 ;Turn-off fan
M104 S0 ;Turn-off hotend
M140 S0 ;Turn-off bed

M84 X Y E ;Disable all steppers but Z
```
