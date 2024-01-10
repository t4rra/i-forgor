# Remote Desktop
i often need remote access to my home PC and i don't like to use AIO solutions like Parsec/Rainway/Teamviewer because of their latency/bloat. also, some wifi networks (work/school/etc)  block connections made via those programs.

## software
- Tailscale
  - Super easy to setup, just make an account and install on all devices
- Remote desktop Host/Client
  - Current
    - [Sunshine](https://github.com/LizardByte/Sunshine)/[Moonlight](https://github.com/moonlight-stream/moonlight-qt)
    - ~1 frame of latency when host/client directly connected with ethernet
  - Alternates
    - Windows Remote Desktop/Remote Desktop - Better graphics, higher latency, very good compatibility with windows natively

## setup (Sunshine/Moonlight)
### sunshine
[installation](https://docs.lizardbyte.dev/projects/sunshine/en/latest/about/installation.html#windows)/[setup](https://docs.lizardbyte.dev/projects/sunshine/en/latest/about/usage.html#windows)

#### tl;dr
1. download sunshine
2. run sunshine (foreground mode), terminal will popup
3. run commands detailed in setup link
3. wait for the log message along the lines of "Configuration UI available at [URL]"
4. go to URL, if first time it will ask to set password

### moonlight
1. download client
2. enter tailscale ip of host (if accessing remotely) or enter local ip of host (if accessing locally/over direct ethernet)
3. adjust settings according to network
3. select pc, click desktop
