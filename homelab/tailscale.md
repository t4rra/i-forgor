# tailscale
tailscale my beloved

super easy vpn service, just make an account and install on all devices lol

## https
1. [enable https on tailscale](https://tailscale.com/kb/1153/enabling-https/#configure-https)
2. run `tailscale cert`
   1. the documentation says it'll work without any args but in my experience it returns an error asking for the domain (it'll provide one)
3. in the current directory, there will be two files `*.crt` and `*.key`