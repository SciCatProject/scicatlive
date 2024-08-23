# [Proxy](https://doc.traefik.io/traefik/)

The proxy acts as a reverse proxy to the SciCat Live containers. 

## Configuration

### [.env file](./config/.env)

It sets proxy options which are rarely changed, for example, the default configuration with the docker network.

### [.tls.env file](./config/.tls.env)

It can be customized to set the TLS options. This has an effect only if the service URLs exposed by traefik are reachable from the public web. 

You need to set the letsencrypt options [here](./config/.tls.env).

## Enable TLS

To enable TLS on specific services, you can set the `<SERVICE>_HTTPS_URL` env var to the desired URL, including the `https://` prefix, making sure that the URLs are reachable by `letsencrypt`. See [here](../../.env) for an example. This will request the certificate from `letsencrypt`.
