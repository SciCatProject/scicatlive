# [Proxy](https://doc.traefik.io/traefik/)

The proxy acts as a reverse proxy to the SciCat Live containers.

## Configuration options

### [.env file](./config/.env)

It sets proxy options which are rarely changed, for example, the default configuration with the docker network.

### [.tls.env file](./config/.tls.env)

It can be customized to set the TLS options. This has an effect only if the service URLs exposed by traefik are
reachable from the public web.

You need to set the letsencrypt options in the [./config/.tls.env](./config/.tls.env) file.

## Default configuration

By default, all services are exposed on localhost with no TLS termination, and following the convention:

- frontend: `http://localhost`
- other services: `http://{service}.localhost`

## Enable additional features

To enable TLS on specific services, you can set the `<SERVICE>_HTTPS_URL` env var to the desired URL, including the
`https://` prefix, making sure that the URLs are reachable by `letsencrypt`. See the root .env [../../.env](../../.env)
for an example. This will request the certificate from `letsencrypt`.
