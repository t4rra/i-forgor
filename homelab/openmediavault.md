# openmediavault
I need a server to store my files when video editing so I can access them from all my devices (and maybe even get others to collaborate!)

## Materials
- Optiplex 3070
  - i3-9100f
  - 8gb ram
  - no gpu
  - 128gb boot drive
  - (tbd) ~~ssd storage~~
- usb drive

## Prerequisites
- basic knowledge of the linux command line
- [openmediavault](https://www.openmediavault.org/download.html) flashed onto a USB drive 

## Installing OMV

## Tailscale Setup

## HTTPS with Tailscale
1. [setup tailscale https](./tailscale.md#https)
2. send certificate/key to a device connected to your tailnet that can also access the OMV web interface
3. under `System` > `Certificates` > `SSL`, click the `+` button to import a certificate
4. upload your `.key` and `.crt` files and click import
5. under `System` > `Workbench`, tick the SSL/TLS enabled box and select the certificate you just imported
6. hit save