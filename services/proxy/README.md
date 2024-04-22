# Proxy

The proxy acts as a reverse proxy to the SciCat Live containers. 

## [config.yaml file](./config/config.yaml)

It sets proxy options. Most of them are rarely changed, but the user who wants to enable TLS, provided that the service URLs exposed by traefik are reachable from the public web, should change the [resolver settings](./config/config.yaml#L17-L18) accordingly.

## Enable TLS

The proxy sets a default certificate resolver, using letsencrypt. To use it, the user should: 
1. change the [resolver settings](./config/config.yaml#L17-L18)
2. restart the proxy service
3. add dedicated labels to each service the user wants to expose, making sure that the URLs are reachable by letsencrypt. The user should set: the service public URL, the certificate resolver annotation and set the entrypoint to `websecure` to use port 443. For example, for the [frontend service](../frontend/docker-compose.yaml):

```diff
    labels:
-      - traefik.http.routers.frontend.rule=Host(`localhost`)
+      - traefik.http.routers.frontend.rule=Host(`<YOUR_PUBLIC_HOST>`)
+      - traefik.http.routers.frontend.entrypoints=websecure
+      - traefik.http.routers.frontend.tls.certresolver=leresolver
```
