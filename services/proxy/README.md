# [Proxy](https://doc.traefik.io/traefik/)

The proxy acts as a reverse proxy to the SciCat Live containers. 

## Configuration

### [.env file](./config/.env)

It sets proxy options which are rarely changed, for example, the default configuration with the docker network.

### [.tls.env file](./config/.tls.env)

It can be customized to set the TLS options. This has an effect only if the service URLs exposed by traefik are reachable from the public web. 

You need to set the letsencrypt options [here](./config/.tls.env).

## Enable TLS

The proxy sets a default certificate resolver, using letsencrypt. To use it, you should:

1. change the [resolver settings](./config/.tls.env). If the docker volume `letsencrypt_proxy_data` already exists, you might need to remove it to apply changes from the [.tls.env file](./config/.tls.env)
2. add dedicated labels to each service to expose, making sure that the URLs are reachable by letsencrypt. You should set: the service public URL and the certificate resolver annotation and set the entrypoint to `websecure` to use port 443 only. For example, for the [frontend service](../frontend/compose.base.yaml):

```diff
    labels:
-     - traefik.http.routers.frontend.rule=Host(`localhost`)
+     - traefik.http.routers.frontend.rule=Host(`<YOUR_PUBLIC_HOST>`)
+     - traefik.http.routers.frontend.entrypoints=websecure
```

3. Change any other service that referenced the changed host
4. rerun `docker compose up -d`
