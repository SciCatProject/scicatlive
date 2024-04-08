# SciCat

Files for running SciCat with docker-compose.

## Tags

You can use older versions of SciCat Live by checking out specific tags using `git checkout [TAG]` on your local clone of the repo.

`v1.0` - the first stable version

Note: older versions might not contain certain functionality (e.g. archival mock in `v1.0`). Be sure to take a look at that version's `README.md` as well.

## Steps

1. Clone the repository
   ```sh
   git clone https://github.com/SciCatProject/scicatlive.git
   ```
2. Run with the following command inside the directory
   ```sh
   docker-compose up -d
   ```

## Default setup

By running `docker-compose up -d` these steps take place:
1. a [mongodb](./services/mongodb/) container is created with some intial data.
2. the SciCat [backend v3*](./services/backend/) container is created and connected to (1).
3. the SciCat [backend v4](./services/backendnext/) container is created and connected to (1).
4. the SciCat [frontend](./services/frontend/) container is created and connected to (3).
5. the SciCat [PaN searchapi](./services/searchapi/) container is created and connected to (3).
6. a reverse [proxy](./services/proxy) container is created and routes trafic to (2), (3), (4) and (5) through localhost subdomains, in the form: `http://${service}.localhost` (for the ones of need). The frontend is available at simply `http://localhost`.

We flag with `*` the services which have extra internal dependencies, which are not shared across the two backend versions. To view them, refer to the service README.

Here below we show the dependencies (if `B` depends on `A`, then we visualize as `A --> B`):

```mermaid
graph TD
   subgraph services
      subgraph backends
         backend[backend*]
         backendnext
      end

      mongodb --> backends
      backend --> frontend
      backend --> searchapi
   end

   proxy -.- backends
   proxy -.- frontend
   proxy -.- searchapi
```

## Select the services

The user can selectively decide the containers to spin up and the dependencies will be resolved accordingly. The available services are in the [services](./services/) folder and called consistently.

For example, one could decide to only run the `backend` by running (be aware that this will not run the `proxy`, so the service will not be available at `backend.localhost`):

```sh
docker-compose up -d backend
```

(or a list of services, for example, with the proxy `docker-compose up -d backend proxy`)

This will run, from the [previous section](#default-setup), (1) and (2) but skip the rest.

Accordingly,
```sh
docker-compose up -d frontend(/searchapi)
```

Will run, from the [previous section](#default-setup), (1), (2) and (4/(5)) but skip (3), (5/(4)) and 6.

## Custom configure a service

Every service folder (inside the [services](./services/) parent directory) contains its configuration and some instructions, at least for the non third-party containers.

For example, to configure the [frontend](./services/frontend/), the user can change any file in the [frontend config](./services/frontend/config/) folder, for which instructions are available in the [README](./services/frontend/README.md) file.

After any configuration change, `docker-compose up -d` must be rerun, to allow loading the changes.

## Add a new service

To add a new service (see the [backend](./services/backend/) for an extensive example):
1. create a dedicated folder in the [services](./services/) one
2. call it as the service should be named
3. create the `docker-compose.yaml` file with the required dependencies (if any)
4. eventually include any service in (3) which is specific to the service and not shared across the global setup
5. eventually create a `config` folder if it requires configuration
6. add a `README.md` file in the service if needed
7. include the reference to (3) to the global [docker-compose include list](docker-compose.yaml#L2)
8. update the main [README.md](README.md) if needed

## General use of scicat

To use scicat, please refer to the [original documentation](https://scicatproject.github.io/documentation/)
