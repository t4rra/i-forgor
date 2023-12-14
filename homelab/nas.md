# overview
ive been a big fan of google drive's virtual drive/selective file sync system and i've found a fairly seamless way to replicate that locally (and over the internet) via truenas/tailscale/seafile

for video editing (my main goal) it would completely replace the need for a proxy/resolve project server workflow which is convoluted and something my smooth brain refuses to work with. i take plenty of photos while traveling, which with my nas setup, removes the need to carry an external drive that I could lose/damage, while automatically backing up over wifi!

> NOTE:
> 	Seafile stores/manages files in a proprietary way that makes it difficult to recover if it breaks, and is developed by a Bejing-based company. 
> 	--
> 	Additionally, you won't get any online collaboration as opposed to using Resolve Project Server.

> HOWEVER:
> 	Seafile's proprietary file storage/management is the reason for its speed. Also, Seafile's system has a good reputation, with little reports of things gone wrong. To the second point, Seafile is FOSS (and selfhosted)! You're free to review the code yourself and it's not a small, unknown project by any means.
> 	--
> 	I'd argue the setup of Resolve project server is just as big of a hassle as sharing project files 

## Materials
- Optiplex 3070
  - i3-9100f
  - 8gb ram
  - no gpu
  - 128gb boot drive
  - ~~ssd storage~~ (tbd, currently testing with 3 256gb SSDs in Raid Z1, this shouldn't affect setup in any way)
- usb drive
## Software
- truenas
- seafile
- tailscale
## Prerequisites
- tailscale account/existing tailnet setup
- truenas installed onto server, web UI accessible locally
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
	1. server hostname: `local`
	2. seafile admin email: [whatever email you want]
	3. seafile admin password: [whatever password you want]
	4. leave all other values as default
3. push `Install`, and you're done!
### Client Setup
> I tore my head out trying to access the Seafile port on the tailscale address, which [I found out thanks to this blog post](https://kressle.in/articles/2023/tailscale-on-truenas-scale) that it's still accessible over the internet via the local address because subnet routes (i have no idea what subnet routes are or how ip address work lmao)
1. [download the seafile drive client for your respective system](https://www.seafile.com/en/download/) (not the desktop syncing client)
2. in `truenas > apps > seafile` click on `open` and copy the URL+port (example: 192.168.1.24:8000)
		> I haven't been able to get the web GUI to sign in; it always tosses a `403: CSRF verification failed` error, but the client GUIs work
	1. ![[Pasted image 20231214001531.png]]
4. install and sign into the client (see image)
	1. ![[Pasted image 20231214000353.png]]
	2. yes, this is the local address that's accessible over the internet if you have tailscale on your client
5. you should see a new drive in your system named SeaDrive