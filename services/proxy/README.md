# Proxy

The proxy acts as a reverse proxy to the SciCat Live containers. 

## Configuration

### [.env file](./config/.env)

It sets proxy options which are rarely changed, for example, the default configuration with the docker network.

### [.tls.env file](./config/.tls.env)

It can be customized to set the TLS options. This has an effect only if the service URLs exposed by traefik are reachable from the public web. 

The user needs to set the letsencrypt options [here](./config/.tls.env#L2-L3).

## Enable TLS

The proxy sets a default certificate resolver, using letsencrypt. To use it, the user should: 
1. change the [resolver settings](./config/.tls.env#L2-L3)
2. restart the proxy service
3. add dedicated labels to each service the user wants to expose, making sure that the URLs are reachable by letsencrypt. The user should set: the service public URL, the certificate resolver annotation and set the entrypoint to `websecure` to use port 443 only. For example, for the [frontend service](../frontend/docker-compose.yaml):

```diff
    labels:
-     - traefik.http.routers.frontend.rule=Host(`localhost`)
+     - traefik.http.routers.frontend.rule=Host(`<YOUR_PUBLIC_HOST>`)
+     - traefik.http.routers.frontend.entrypoints=websecure
+     - traefik.http.routers.frontend.tls.certresolver=leresolver
```
