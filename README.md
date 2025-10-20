# SciCatLive

Get set up with an instance of SciCat to explore the metadata catalog. SciCatlive provides a flexible and easy way to
learn about SciCat and its features for people who are looking to integrate SciCat into their environment. For a user
guide please see [original documentation](https://scicatproject.github.io/documentation/).

This project requires docker and docker compose. The docker version must be later than 2.29.0 to support this project.

## First stable version

Release `v3.0` is the first stable and reviewed version of SciCatLive.

## Steps

<details markdown="1">
<summary>Windows specific instructions (click to expand)</summary>
<br>
:warning: Running this project on Windows is not officialy supported, you should use Windows Subsystem for Linux (WSL).

However, if you want to run it on Windows you have to be careful about:

- This project makes use of symbolic links, Windows and git for Windows have to be
  [configured to handle them](https://stackoverflow.com/questions/5917249/git-symbolic-links-in-windows).
- End of lines, specifically in shell scripts. If you have the git config parameter `auto.crlf` set to `true`, git will
  replace LF by CRLF causing shell scripts and maybe other things to fail.
- This project uses the variable `${PWD}` to ease path resolution in bind mounts. In PowerShell/Command Prompt, the
  `PWD` environment variable doesn't exist so you would need to set in manually before running any `docker compose`
  command.

</details markdown="1">
<br>

1. Clone the repository

   ```sh
   git clone https://github.com/SciCatProject/scicatlive.git
   ```

2. Run with the following command inside the directory

   ```sh
   docker compose up -d
   ```

## Default setup

By running `docker compose up -d` these steps take place:

1. the SciCat [backend v4](./services/backend/services/v4/) container is created and connected to a
   [mongo DB](./services/backend/services/mongodb/).
2. the SciCat [frontend](./services/frontend/) container is created and connected to (1).
3. a reverse [proxy](./services/proxy) container is created and routes traffic to (1) and (2) through localhost
   subdomains, in the form: `http://${service}.localhost`. The frontend is available at simply `http://localhost`.
4. Some services have additional endpoints that can be explored in SciCatLive which would follow
   `http://${service}.localhost/${prefix}`. For example, the backend API can be explored through a Swagger UI at
   `http://backend.localhost/explorer`. For more information on the paths used by these routes see the original
   documentation for these services.

## Extra services

SciCat has extra features as part of its core as well as integrating with external services.

SciCat features that extend the backend are:

- Jobs - this mechanism posts to a [message broker](./services/backend/services/rabbitmq/). In v3 it can then trigger
  [down stream processes](./services/backend/services/v3/services/archivemock/). To use this a RabbitMQ server is
  enabled.
- [Elasticsearch](./services/backend/services/v4/services/elastic/) - creates an elasticsearch service to provide full
  text search in the backend.

Services that can be integrated with SciCat are:

- [LDAP](./services/backend/services/ldap/) - authentication and authorization from an LDAP server
- [OIDC](./services/backend/services/keycloak/) - authentication and authorization using an OIDC provider
- [SearchAPI](./services/searchapi/) - for better free text search in the metadata based on the PANOSC
  [search-api](https://github.com/SciCatProject/panosc-search-api/)
- [LandingPage](./services/landingpage/) - a public interface for published datasets:
  [landingpage](https://github.com/SciCatProject/LandingPageServer)
- [JupyterHub](./services/jupyter/) - Adds an instance of JupyterHub which demonstrates ingestion and extraction of
  metadata using [pyscicat](https://scicatproject.github.io/pyscicat/).
- [OAIPMH](./services/oaipmh/) - a service for published metadata via the
  [OAI-PMH protocol](https://www.openarchives.org/pmh/): [oaipmh](https://github.com/SciCatProject/oai-provider-service)

To simply enable one or more of these extra services configure them by setting the proper environment variable(s) and/or
compose profile(s) from [this table](#docker-compose-profiles-and-env-variables-configuration-options).

For a complete guide on how to customise or configure any service, including the default ones, please refer to these
sections:

- manually [select the services](#select-the-services)
- use [docker compose env variables](#docker-compose-env-variables) to enable features (supported values from this
  [table](#docker-compose-profiles-and-env-variables-configuration-options))
- use [docker compose profiles](#docker-compose-profiles) to enable extra services (supported values from this
  [table](#docker-compose-profiles-and-env-variables-configuration-options))
- modify the [service-specific config](#service-specific-config) to customise specific services
- add [entrypoints](#entrypoints) to control startup logic

For a guide on how to add a new service, please refer to [this section](#add-a-new-service).

### Dependencies

Here below we show the dependencies, including the ones of the [extra services](#extra-services) (if `B` depends on `A`,
then we visualize it as `A --> B`):

```mermaid
graph TD
   subgraph services
      subgraph backend
         backends[v3*/v4*]
      end
      backend --> frontend
      backend --> searchapi
      backend --> landingpage
      backend --> oaipmh
      backend --> jupyter
   end

   proxy -.- services

   %% CSS Styling
   linkStyle 5 marker-end:none
```

We flag with `*` the services which have extra internal dependencies, which are not shared.

### Select the services

The user can selectively decide the containers to spin up and the dependencies will be resolved accordingly. The
available services are in the [services](./services/) folder and are called consistently.

For example, one could decide to only run the `backend` by running (be aware that this will not run the `proxy`, so the
service will not be available at `backend.localhost`):

```sh
docker compose up -d backend
```

(or a list of services, for example, with the proxy `docker compose up -d backend proxy`)

This will run, from the [previous section](#default-setup), (1) and (2) but skip the rest.

<details markdown="1">
 <summary>Accordingly (click to expand)...</summary>

```sh
docker compose up -d frontend
```

Will run, from the [previous section](#default-setup), (1), (2) and (4) but skip (5).

And

```sh
docker compose --profile search up -d searchapi
```

Will run, from the [previous section](#default-setup), (1) and (2), skip (3) and (4), and add the `searchapi` service.

</details>

Make sure to check the [backend compatibility](#docker-compose-profiles-and-env-variables-configuration-options) when
choosing services and setting `docker compose env vars and profiles`.

## Features

### Docker compose env variables

They are used to modify existing services where whenever enabling the feature requires changes in multiple services.
They also have the advantage, compared to docker profiles, of not needing to define a new profile when a new combination
of features becomes available. To set an env variable for docker compose, either assign it in the shell or change the
[.env](./.env) file. To later unset it, either unset it from the shell or assign it an empty value, either in the shell
or in the [.env](./.env) file.

For example, to use the Jobs functionality of SciCat change `JOBS_ENABLED` to true before running your `docker compose`
command or simply export it in the shell. For all env configuration options see this
[section](#docker-compose-profiles-and-env-variables-configuration-options).

### Docker compose profiles

They are used when adding new services or grouping services together (and do not require changes in multiple services).
To enable any, run `docker compose --profile <PROFILE> up -d`, or export the `COMPOSE_PROFILES` env variable as
described by the [docker docs](https://docs.docker.com/compose/environment-variables/envvars-precedence/). If needed,
the user can specify more than one profile in the CLI by using the flag as `--profile <PROFILE1> --profile <PROFILE2>`.

For example `docker compose --profile analysis` sets up a jupyter hub with some notebooks for ingesting data into
SciCat, as well as the related services (backend, proxy). For more information on profiles available in SciCat live see
the following [table](#docker-compose-profiles-and-env-variables-configuration-options).

### Docker compose profiles and env variables configuration options

| Type    | Env key               | Value: Service/Feature                                                                                                | Default | Backend Compatibility | Description                                                                                                                                                                                                          | Other impacted services |
| ------- | --------------------- | --------------------------------------------------------------------------------------------------------------------- | ------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| profile | `COMPOSE_PROFILES`    | <li>`analysis`: jupyter<li>`search`: searchapi,landingpage,oaipmh<li>`'*'`: jupyter,searchapi,landingpage,oaipmh</li> | `''`    | \*                    | <li>analysis: enables additional jupyter notebook with python SciCat SDK installed and example notebooks<li>search: enables a SciCat interface for standardized search and a public interface for published datasets |                         |
| env     | `BE_VERSION`          | <li>`v3`: backend/v3<li>`v4`: backend/v4                                                                              | `v4`    | as set                | Sets the BE version to use in (2) of [default setup](#default-setup) to v3                                                                                                                                           | mongodb,frontend        |
| env     | `JOBS_ENABLED`        | `true`: rabbitmq,archivemock (v3 only),jobs feature                                                                   | `''`    | \*                    | Creates a RabbitMQ message broker which the BE posts to and the archivemock listens to. It emulates the data long-term archive/retrieve workflow                                                                     |                         |
| env     | `ELASTIC_ENABLED`     | `true`: elastic,elastic feature                                                                                       | `''`    | v4                    | Creates an elastic search service and sets the BE to use it for full-text searches                                                                                                                                   |                         |
| env     | `LDAP_ENABLED`        | `true`: ldap auth                                                                                                     | `''`    | \*                    | Creates an LDAP service and sets the BE to use it as authentication backend                                                                                                                                          |                         |
| env     | `OIDC_ENABLED`        | `true`: oidc auth                                                                                                     | `''`    | \*                    | Creates an OIDC identity provider and sets the BE to use it as authentication backend                                                                                                                                |                         |
| env     | `DEV`                 | `true`: backend,frontend,searchapi,archivemock in DEV mode                                                            | `''`    | \*                    | The SciCat services' environment is prepared to ease the [development in a standardized environment](#dev-configuration)                                                                                             |                         |
| env     | `<SERVICE>_HTTPS_URL` | `<URL>`: HTTPS termination                                                                                            | `''`    | \*                    | Requests the TLS certificate for the URL to LetsEncrypt through the [proxy](#tls-configuration)                                                                                                                      |                         |
| env     | `DEV_BBACKUP`         | `true`: bidirectional synchronization of DEV volume                                                                   | `''`    | \*                    | Enables [DEV bidirectional synchronization](#dev-bidirectional-synchronization) between ${PWD}/bbackup/${APP} on the host and the dev volume                                                                         |                         |

After optionally setting any configuration option, one can still select the services to run as described by the
[select the services](#select-the-services) section.

#### DEV configuration

<details markdown="1">
 <summary>(click to expand)</summary>

To provide a consistent environment where developers can work, the `DEV=true` option creates the SciCat services (see
DEV from the [env vars section](#docker-compose-env-variables) for the list), but instead of running them, it just
creates the base environment that each service requires. For example, for the `backend`, instead of running the web
server, it creates a NODE environment with `git` where one can develop and run the unit tests. This is useful as often
differences in environments create collaboration problems. It should also provide an example of the configuration for
running tests. Please refer to the services' README for additional information, or to the Dockerfile `CMD` of the
components' GitHub repo if not specified otherwise. The `DEV=true` affects the SciCat services only.
It's also possible to only run some services in development mode by using their respective variables (eg. `BACKEND_DEV=true`)

Please be patient when using DEV as each container sets the env for dev, including the requirements for testing, which
might take a little to finish. To see if any special precaution is required to run the tests, refer to the
[compose.dev.test.yaml](.github/compose.dev.test.yaml) file where tests files are referenced and refer to their content.
**When DEV=true**, if you want to run tests when the containers start, you can do so by including the
`compose.dev.test.yaml` compose file.

```bash
docker compose -f compose.yaml -f .github/compose.dev.test.yaml ...
```

It is very convenient if using [VSCode](https://code.visualstudio.com/docs/devcontainers/attach-container), as, after
the docker services are running, one can attach to it and start developing using all VSCode features, including version
control and debugging.

Please note that [entrypoints](#entrypoints) when `DEV=true` are only run when the component's container is created for
the first time. This is done to avoid clashes with local changes.

To ease writing DEV configuration, a dev template is provided at
[./services/compose.dev.yaml](./services/compose.dev.yaml) and each component inhearits from it. As you can see in the
file [./services/frontend/compose.dev.](./services/frontend/compose.dev.yaml), setting the componenent specific
variables from the relative [.env file](./services/frontend/.env). :warning: Docker compose applies a
[precedence mechanism](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/#local-env-file-versus-project-directory-env-file)
whenever the same variable is defined in `.env` files in nested folders, with precedence to the folder where the default
`COMPOSE_FILE` lives. This means that the current template cannot be used in case of nested components, at least for the
parts where local variables are used. There is no conflict with variables defined multiple times in `.env` files at the
same level.

:warning: To prevent git unpushed changes from being lost when a container is restarted, the work folder of each
service, when in DEV mode, is mounted to a docker volume, with naming convention
`${COMPOSE_PROJECT_NAME}_<service>_dev`. Make sure, to commit and push frequently, especially before removing docker
volumes to push the relevant changes.

:warning: As the DEV containers pull from upstream/latest, there is no guarantee of their functioning outside of
releases. If they fail to start, try, as a first option, to build the image from a tag (e.g.
[build context](./services/frontend/compose.dev.yaml)) using the
[TAG](https://docs.docker.com/reference/cli/docker/image/build/#git-repositories) and then git checkout to that tag
(e.g. set [GITHUB_REPO](./services/frontend/compose.dev.yaml) including the branch using the same syntax and value as
the build context). You can achieve this, by setting the `GITHUB_REPO` env variable in the component `.env` file (e.g.
the [frontend env file](./services/frontend/.env)) as follows:

```diff
-  GITHUB_REPO=https://github.com/SciCatProject/frontend.git
+  GITHUB_REPO=https://github.com/SciCatProject/frontend.git#v4.4.1
```

The repo is checkout at that particular commit only if the docker volume does not yet exist.

##### DEV bidirectional synchronization

Setting `DEV_BBACKUP=true` in the [.env](./.env) file enables bidirectional synchronization between the DEV volume of
each component (e.g. `frontend_dev`) and a directory on the host placed at `${PWD}/bbackup/${APP}` (e.g.
`${PWD}/bbackup/${APP}`). This is sometimes convenient both to have a backup of the volume and to enable the use of
additional tools installed on the host, which require file access.

</details>

#### TLS configuration

You can enable TLS termination of desired services by setting the `<SERVICE>_HTTPS_URL`, by setting the full URL,
including `https://`. The specified HTTPS URL will get a `letsencrypt` generated certificate through the proxy setting.
For more details see the [proxy instructions](./services/proxy/README.md). After setting some URLs, the required changes
in dependent services are automatically resolved, as explained for example in the
[frontend docs](./services/frontend/README.md). Whenever possible, we use either the docker internal network or the
localhost subdomains.

:warning: Please make sure to set all required `<SERVICE>_HTTPS_URL` whenever enabling one, as mixing public URLs and
`localhost` ones might be tricky. See, for example, what is described in the
[frontend documentation](./services/frontend/README.md#enable-additional-features) and the
[backend documentation](./services/backend/README.md#enable-additional-features).

### Service-specific config

It can be changed whenever needing to configure a service independently from the others.

Every service folder (inside the [services](./services/) parent directory) contains its configuration and some
instructions, at least for the non-third-party containers.

For example, to configure the [frontend](./services/frontend/), the user can change any file in the
[frontend config](./services/frontend/config/) folder, for which instructions are available in the
[README](./services/frontend/README.md) file.

After any configuration change, `docker compose up -d` must be rerun, to allow loading the changes.

### Entrypoints

Sometimes, it is useful to run init scripts (entrypoints) before the service starts. For example, for the `landingpage`
composability, it is useful to specify its configuration through multiple JSON files, with different scopes, which are
then merged by a [init script](./entrypoints/merge_json.sh). For this reason, one can define
[common entrypoints](./entrypoints/) and service-specific ones (e.g.
[backend v4 ones](./services/backend/services/v4/entrypoints/)) which can be run inside the container, before the
service starts (i.e. before the docker compose `command` is executed). Whenever these entrypoints are shared between
services, it is recommended to place them in an `entrypoints` folder below the outermost service (e.g.
[this one](./entrypoints/)).

To ease the iterative execution of multiple init scripts, one can leverage the
[loop_entrypoints](./entrypoints/loop_entrypoints.sh) utility, which loops alphabetically over
`/docker-entrypoinst/*.sh` and executes each. This is in use in some services (e.g. in the
[frontend](./services/frontend/compose.yaml)), so one can add additional init steps by mounting them, one by one, as
volumes inside the container in the `/docker-entrypoints` folder and naming them depending on the desired order
(eventually rename the existing ones as well).

#### If the service does not support entrypoints yet, one needs to

<details markdown="1">
 <summary>(click to expand):</summary>

1. mount the [loop_entrypoint.sh](./entrypoints/loop_entrypoints.sh) as a volume inside the container
2. mount any service-specific init script as a volume in the container in the folder `/docker-entrypoints/*.sh`, naming
   them sequentially, depending on the desired execution order
3. override the `entrypoint` field in the service
4. specify the service `command`

See for example the [frontend compose file](./services/frontend/compose.yaml).

</details>

## Add a new service

Please note that services should, in general, be defined by their responsibility, rather than by their underlying
technology, and should be named so.

### Basic

To add a new service (see the [jupyter service](./services/jupyter/) for a minimal example):

1. create a dedicated folder in the [services](./services/) one \*
2. name it as the service
3. create the `compose.yaml` file
4. eventually, add a `README.md` file in the service
5. eventually, add the platform field, as described by the [supperted OSs](#supported-os-architectures)
6. include the reference to (3) to the global [compose include list](compose.yaml) \*
7. eventually, update the main [README.md](README.md)

\* if the service to add is not shared globally, but specific to one particular service or another implementation of the
same component, add it to the `services` folder relative to the affected service, and in (6) add it to its inclusion
list. See an example of a service relative [services folder here](./services/backend/services/) and a
[relative inclusion list here](./services/backend/compose.yaml).

#### Supported OS architectures

Since some images are not built with multi-arch, in particular the SciCat ones, make sure to specify the platform of the
service in the compose, when needed, to avoid possible issues when running `docker compose up` on different platforms,
for example on MAC with arm64 architecture. See for example the
[searchapi compose](./services/searchapi/compose.yaml#L3).

### Advanced

<details markdown="1">
 <summary>(click to expand)</summary>

To add a new service, with advanced configuration (see the [backend](./services/backend/) for an extensive example,
or/and this [PR](https://github.com/SciCatProject/scicatlive/pull/325) which added the
[landingpage](./services/landingpage/)):

1. follow the steps from the [basic section](#basic)
2. eventually, include any service, in the service-specific folder which is specific to the service and not shared by
   other, more general services, e.g. here: [./services/backend/services/](./services/backend/services/). This folder
   should also include different versions of the same service, e.g. [v3 and v4](./services/backend/services/)
3. eventually, if the service supports [ENVs](#docker-compose-env-variables), leverage the
   [include override](https://docs.docker.com/compose/multiple-compose-files/include/#include-and-overrides) feature
   from docker compose. For this:
   1. create a `compose.base.yaml` file, e.g.
      [./services/backend/services/v4/compose.base.yaml](./services/backend/services/v4/compose.base.yaml), which should
      contain the `base` configuration, i.e. the one where all ENVs are unset, i.e. the features are disabled
   2. create the ENV-specific (e.g. `ELASTIC_ENABLED`) `compose.<ENV>.yaml` file, e.g.
      [backend v4 compose.elastic.yaml](./services/backend/services/v4/compose.elastic.yaml), with the
      additional/override config, specific to the enabled feature
   3. create a symlink from [.empty.yaml](./services/.empty.yaml) to each `.compose.<ENV>.yaml`, e.g.
      [./services/backend/services/v4/.compose.elastic.yaml](./services/backend/services/v4/.compose.elastic.yaml). This
      is used whenever the `ENV` is unset, as described in the next step
   4. use `compose.yaml` to merge the `compose*.yaml` files together, making sure to default to `.compose.<ENV>.yaml`
      whenever the `ENV` is not set. See an example
      [./services/backend/services/v4/compose.yaml](./services/backend/services/v4/compose.yaml)
   5. if the service is another version of an existing one, e.g. v3 and v4 versions of the `backend` service, add the
      selective include in the parent compose.yaml, e.g.
      [./services/backend/compose.yaml](./services/backend/compose.yaml)
   6. eventually, modify the [compose workflow](.github/workflows/compose_test.yaml) to add the toggle to the matrix. If
      the toggle depends on the changed files, remember to create the toggle configuration
      [.github/changed_files.yaml](.github/changed_files.yaml) and create the
      [exclude](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#excluding-matrix-configurations)
      rule in the workflow.

4. eventually, add entrypoints for init logics, as described by the section to
   [enable entrypoints](#if-the-service-does-not-support-entrypoints-yet-one-needs-to), e.g. like
   [./services/backend/services/v4/compose.base.yaml](./services/backend/services/v4/compose.base.yaml), including any
   [ENVs](#docker-compose-env-variables) specific logic. Remember to set the environment variable in the compose.yaml
   file.

</details>

## General use of SciCat

To use SciCat, please refer to the [original documentation](https://scicatproject.github.io/documentation/).
