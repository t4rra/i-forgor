# resolve project server
I edit video at many places outside of my home, and my current workflow of exporting/importing project files sucks.

## prerequisites
- [tailscale](./tailscale.md) fully setup on server and client
- davinci resolve
- [davinci resolve project server](https://www.blackmagicdesign.com/products/davinciresolve/collaboration) [RPS]

## the big problem
RPS runs off of Postgres, which can let me connect over tailscale but with the way RPS sets up Postgres, they make this impossible. Step [2] will fix this.

## steps
1. install RPS
2. at the postgres data folder (in my case, `C:\Program Files\PostgreSQL\13\data`), edit the `pg_hba.conf` by changing the line 
   
   ```host all all 127.0.0.1/24 scram-sha-256```
   to
   ```host    all    all    0.0.0.0/0    md5```
3. create a project library in the server app
4. on the client machine, open resolve and under the `network` tab of the project manager, connect to your server with its tailscale IP address

## another (kinda big) problem
footage isn't shared between the server and client, so you have to manually copy it over. i use davinci resolve's proxy generator app to create proxies of footage and copy it over to a USB drive. 
