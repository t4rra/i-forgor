# github personal access token with netlify

> i'm 72.53% sure this is the right way to do things but dont trust me or blame me if you end up leaking your secrects

[thanks, netlify docs](https://docs.netlify.com/routing/redirects/rewrites-proxies/) (i had to ask chatGPT and it solved it in 30 seconds after googling for hours 💀)

## personal access token
1. on github, get a personal access token with fine-grained permissions allowing only read access to a repo
2. save it as an environment variable in netlify

## netlify.toml config
1. add a redirect rule from an internal url to the `raw.githubusercontent` domain
2. set status to 200
3. make sure it's forced
4. add a header with the key as `Authorization` and value as `"Bearer $[ENVIRONMENT VARIABLE NAME]"`
```
[[redirects]]
  from = "/ghRAW/*"
  to = "https://raw.githubusercontent.com/:splat"
  status = 200
  force = true
  [redirects.headers]
    Authorization = "Bearer $GH_PAT"
```
