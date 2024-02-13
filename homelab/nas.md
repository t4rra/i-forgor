# overview
this is a pretty good google drive desktop app replacement for me, as it lets me selectively sync files to my device for offline use. My laptop's storage will act like a cache for my NAS, and will sync automatically over wifi! It simplifies my workflow for video editing and traveling. However, collaboration with others via davinci resolve is severly limited, and I can only pray my 3-2-1 backup stragety (*3* religions, *2* deities, and *1* daily prayer) doesn't fail (i have no data backup stragety lmao i'm so screwed)


> NOTE:
> 	Seafile stores/manages files in a proprietary way that makes it difficult to recover if it breaks, and is developed by a Bejing-based company. 
> 	
> 	Additionally, you won't get any online collaboration as opposed to using Resolve Project Server.

> HOWEVER:
> 	Seafile's proprietary file storage/management is the reason for its speed. Also, Seafile's system has a good reputation, with little reports of things gone wrong. To the second point, Seafile is FOSS (and selfhosted)! You're free to review the code yourself and it's not a small, unknown project by any means.
> 	
> 	I'd argue the setup of Resolve project server is just as big of a hassle as sharing project files 

## Materials
- Old PC (Dell Precision 3620)
  - i7-6700
  - 20gb ram
  - no gpu
  - 2x 256gb boot ssd (truenas installed on both for redundancy)
  - 4x3tb HGST Deskstar HDD (HDN724030ALE640)
  - 2x 3.5in to 5.25in drive adapters (for mounting the other two HDDs)
- usb drive
- Raspberry Pi (i have a base model 4b) [not required if you don't need wifi]
## Software
- truenas
- seafile
- tailscale
- OpenWrt
## Prerequisites
- tailscale account/existing tailnet setup
- truenas installed onto server, web UI accessible locally (just flash truenas onto usb, boot into it, and install w/ default settings)
## Raspberry Pi Setup
> NOTE: Skip this section if you're connecting your NAS directly over ethernet. I highly recommend you do that, for simplicity and reliability. Do as I say, not as I do :)
> 
> I can't put my noisy server in the living room, can't run ethernet into a closet, and I found that powerline adapters were slower than wifi.

Unfortunately, truenas doesn't support wifi (natively) and [attempting to install it](https://clint.id.au/?p=2958) didn't work. I had a raspberry pi lying around (it used to be [my pc's ip kvm](./deprecated/pikvm.md)) and I figured it could probably work as a wifi-to-ethernet bridge. 

1. [Flash OpenWrt](https://openwrt.org/toh/raspberry_pi_foundation/raspberry_pi)
2. I recommend connecting the Raspberry Pi directly to your computer first so you can get OpenWrt setup without hassle.
	1. You should shutoff wifi as OpenWrt's default subnet may conflict with your home's.
	2. Try accessing `192.168.1.1` from the browser. If you cannot, you need to change your own device's network address to `192.168.1.x` to be able to access it. 
4. [I followed this guide and it worked](https://www.youtube.com/watch?v=fl1TXlQakxg)
	1. tl;dr, connect to wifi under `network > wireless > scan`, install the `luci-proto-relay` package, reboot, create a new `bridge` type interface that relays between `lan` and `wwan`, put everything into one firewall group
5. Take the pi and plug it into your NAS. You should be able to access your Pi from its address given by your home network. (not 192.168.1.1)
6. In OpenWrt, under `status > routing`, you should be able to find your server under the bridge network.
7. Type that address into your address bar, and you should be able to see the Truenas screen.

## Tailscale Setup
1. get [an auth key from tailscale](https://tailscale.com/kb/1085/auth-keys) - a one-off one will do just fine, toggle `Pre-approved` for convenience 
2. install tailscale from truenas' apps; it'll bring you to a config page
3. configure values (see images below)
	1. paste the auth key, change the hostname if desired
	2. under `Advertise Routes`, write the IP address of the server, followed by `/32` - this will allow your seafile app to be accessible over the internet
	3. make sure `Host Network` is checked under `Network Configuration`
	4. leave other values as default
![[Pasted image 20231213233147.png]]
![[Pasted image 20231213233336.png]]
4. push `Install`, then go to your tailscale admin panel
5. under your NAS, there should be your IP waiting for approval - click on edit and tick the ip address
	1. ![[Pasted image 20231213233900.png]]
6. you're all done! you can access the truenas web GUI at the 100.xxx.xxx.xxx address.
## Seafile Setup
### Server Setup
1. add the [truecharts app repo](https://truecharts.org/manual/SCALE/guides/getting-started/#adding-truecharts) 
2. search for and install seafile, configure the values:
	1. server hostname: `[IP ADDR]:[PORT]`
	    1. It should be the IP you're accessing the server on, plus the port that's under `Networking and Services > Port` (scroll down)
            2. It's pretty hard to change this after setting Seafile up! Make sure that you won't be changing your server's IP address anytime soon! I'll put instructions to change this at the end just in case.  
   2. seafile admin email: [whatever email you want]
   3. seafile admin password: [whatever password you want]
   4. leave all other values as default
3. push `Install`, and you're done!
### Client Setup
> I tore my hair out trying to access the Seafile port on the tailscale address, which [thanks to this blog post](https://kressle.in/articles/2023/tailscale-on-truenas-scale) said that it's still accessible over the internet via the local address because subnet routes (i have no idea what subnet routes are or how ip address work lmao)
1. [download the seafile drive client for your respective system](https://www.seafile.com/en/download/) (not the desktop syncing client)
2. in `truenas > apps > seafile` click on `open` and copy the URL+port (example: 192.168.1.24:8000)
	1. ![[Pasted image 20231214001531.png]]
4. install and sign into the client (see image)
	1. ![[Pasted image 20231214000353.png]]
	2. yes, this is the local address that's accessible over the internet if you have tailscale on your client
5. you should see a new drive in your system named SeaDrive
6. Under `My Libraries`, create a folder. These folders are called "Libraries" and cannot be moved into another library. If you want a traditional file storage experience, I recommend creating one library and putting everything else in subfolders.
> NOTE: Don't place files at the root of Seadrive, it'll get deleted!

### Changing Seafile's Hostname
If you cannot download files from the web GUI, it's likely that you have messed up the hostname. I didn't know what the hostname did until I set it without Seafile's port, and realized my mistake.

> thanks [this forum post](https://forum.seafile.com/t/change-hostnme-of-established-seafile-server/4766) and [this article](https://truecharts.org/manual/SCALE/guides/pvc-access/)

1. Stop Seafile if it's currently running.
2. Install [heavy_script](https://github.com/Heavybullets8/heavy_script?tab=readme-ov-file#how-to-install) with sudo.
3. Run heavy_script with command `heavyscript`
4. Mount seafile's PVC storage. (You can find the mount option under `Application Options`). it will give you where the files were mounted, and the command to unmount seafile. make sure to save those.
5. cd into where heavy_script mounted seafile to
6. in that directory, cd into `seafile-storage/conf`. you may get an error saying "permission denied", run `sudo -s` (to enter privileged shell) in that case and try again.
7. edit `seahub_settings.py` with `nano seahub_settings.py`
8. change the `SERVICE_URL` and `FILE_SERVER_ROOT` url to the correct one.
9. save/exit the file.
10. you will need to cd out of the mounted files before you can unmount seafile, in both the privileged shell and the user one.
11. run `sudo [UNMOUNT COMMAND FROM STEP 4]`.
12. start seadrive again.
