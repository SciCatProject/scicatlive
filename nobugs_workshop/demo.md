# SciCat cross-repo dev workshop

**Repos involved:** `backend`, `frontend`, `scicatlive`

An afternoon-length, hands-on workshop built around scicatlive: spin up the stack, find and fix a real bug, verify it,
and land the result as a draft PR. Two independent tracks, meant to be run in parallel by separate groups.

## Requirements

- **Docker** — version 29.7.2 (tested)
- **Docker Compose** — version 5.3.1 (tested)
- **VSCode**. Install the following plugins:
  - **Dev Containers** by Microsoft
  - **Container Tools** by Microsoft

The process is tested with Linux or MacOS. It is possible to run Docker and VSCode on
Windows, but some additional setup may be required.

## Quick Start

In order to start SciCatLive stack in dev mode and start playing with the tool, run the following commands:
```sh
git clone git@github.com:SciCatProject/scicatlive.git
cd scicatlive
git checkout nobugs

PROJECT_NAME=nobugs_testing
DEV=true docker compose -p $PROJECT_NAME up -d
```
Please note that the `Project Name` will change depending on which group you will select/assigned.

## Nomenclature

Emojis are used to show where commands should be run:
- 😸 Run this in the **scicatlive** folder on the host
- 🗄️ Run this inside the **backend** container
- 🖥️ Run this inside the **frontend** container

## Shared setup

Both tracks depend on frontend [PR #2517 — "feat: allow loading configs from other
sources"](https://github.com/SciCatProject/frontend/pull/2517), which adds `additionalConfigs`: the frontend can load
part of its config from a configurable backend URL instead of only its bundled static file. It isn't merged yet, so
this branch checks it out explicitly (step 3 below).

To make that feature actually work end-to-end, scicatlive also needed matching configuration on the backend and
frontend containers — already wired on this branch, across `services/frontend/config/config.json`,
`services/backend/services/v4/compose.base.yaml`, `services/backend/services/v4/config/frontend.config.json`, and
`services/backend/services/v4/config/.env`. See exactly what changed with:

```sh
git diff origin/main...origin/nobugs -- \
  services/frontend/config/config.json \
  services/backend/services/v4/compose.base.yaml \
  services/backend/services/v4/config/frontend.config.json \
  services/backend/services/v4/config/.env
```

Do this once, before splitting into tracks:

1. 😸 **Check out scicatlive**
   First, get a copy of scicatlive with the `nobugs` branch.
   ```sh
   git clone git@github.com:SciCatProject/scicatlive.git
   cd scicatlive
   git checkout nobugs
   ```

   If you have used scicatlive in the past you can safely reuse the clone. Run `docker
   compose down` to stop any prior containers. We will use a new project name below for
   the workshop. This stores all code and database in a new set of docker volumes, so
   you get a clean setup while preserving any prior modifications saved in the main
   `scicatlive` containers.

2. 😸 **Spin up scicatlive in dev mode.**

   Run the following shell commands from the scicatlive directory:

   ```sh
   # Uncomment if ports 80/443 are already taken on your machine:
   #TRAEFIK_HTTP_PORT=81
   #TRAEFIK_HTTPS_PORT=444

   # Use a distinct project name per track/group so they don't collide:
   PROJECT_NAME=nobugs_track1   # or nobugs_track2
   DEV=true docker compose -p $PROJECT_NAME up -d
   ```

   > 🚩 Checkpoint: containers are started

   Run `docker ps`. The output should look something like this
   ```
   CONTAINER ID   IMAGE                                         COMMAND      CREATED       STATUS                 PORTS             NAMES
   cbec9a71f862   traefik:v3.7.13                               "/entryp…"   6 hours ago   Up 6 hours (healthy)   80/tcp, 443/tcp   nobugs_track1-proxy-1
   3a56f0469e63   nobugs_track1-frontend                        "loop_en…"   2 weeks ago   Up 6 hours (healthy)                     nobugs_track1-frontend-1
   dac2902925cc   openapitools/openapi-generator-online:v7.25.0 "/__cace…"   2 weeks ago   Up 6 hours (healthy)   8080/tcp          nobugs_track1-openapigenerator-1
   a2586d899f90   nobugs_track1-backend                         "loop_en…"   2 weeks ago   Up 6 hours (healthy)                     nobugs_track1-backend-1
   a06cd8cb03a4   squidfunk/mkdocs-material:9.7                 "/usr/lo…"   2 weeks ago   Up 6 hours             8000/tcp          nobugs_track1-docs-1
   cafbf1c8706f   alpine:3.24.1                                 "loop_en…"   2 weeks ago   Up 6 hours (healthy)                     nobugs_track1-userdocs-1
   5a1f0dacb2f9   mongo:8.3                                     "docker-…"   2 weeks ago   Up 6 hours             27017/tcp         nobugs_track1-mongodb-1
   ```

3. 😸 **Attach to the backend and frontend containers.**

    Make sure you have the Container Tools plugin in VSCode.
    This should add a container tab to the left bar, allowing running containers to be browsed.
    Alternately, use the "Dev Containers: Attach to Running Container" command from the command pallet.
    Run this twice, connecting to the `nobugs_trackX-backend` and `nobugs_trackX-frontend` started in the previous step.

    The default shell is `sh`, but `zsh` (with oh-my-zsh) is also installed if you prefer it.

   If you are prompted to open a folder choose `/home/node/app` for the 🗄️backend or `/frontend` in the 🖥️frontend.
   
    > 🚩 Checkpoint: You have two VSCode windows


5. 🗄️ **Start the backend.**

   Open a terminal within the 🗄️backend VS Code window (Command Pallet -> "Focus Terminal").

   ```sh
   npm i
   npm run start:dev
   ```

   The backend's Swagger explorer at `http://backend.localhost/explorer`.

   > 🚩 Checkpoint: Open <http://backend.localhost/explorer> in a browser.

6. 🖥️ **Checkout the suggested frontend branch**

   For now, check out the following branch. In track 1 you will learn how to develop
   this code, but for now check out the provided solution branch.

   ```sh
   git checkout be_conf
   ```

7. 🖥️ **Start the frontend**
   ```sh
   npm i
   npm start -- --host 0.0.0.0
   ```

   In the frontend container (`--host 0.0.0.0` is required — the dev server otherwise only binds to localhost inside
   the container. The app is served at `http://localhost`.

   > 🚩 Checkpoint: Open <http://localhost> in a browser.
   >
   > Log in with username: `ingestor` / password: `aman` (or check the backend
   > `functionalAccounts.json` for other valid users).

From here the group splits: [Track 1](track1.md) and [Track 2](track2.md) both start on the backend container, with a
different bug in view.

## The two tracks

- **[Track 1 — Config loading from the backend](track1.md)** — wires the frontend's config loading to the backend,
  and fixes a real bug: the backend overwrites its DB-stored config from file on every restart, silently wiping any
  admin edits. Lands as two PRs: backend, and scicatlive (which also moves the frontend's config-merging logic onto
  the backend).

- **[Track 2 — A PATCH endpoint](track2.md)** — fixes a real bug: the config `PUT` endpoint replaces the whole
  document, so a partial update wipes unrelated fields. Replaces it with a proper atomic `PATCH`, and shows
  `generate_sdk` producing a new client method the moment it's regenerated. Lands as two PRs: backend and frontend.

## What participants leave with

- A working scicatlive dev setup, driven themselves across both containers.
- Up to four reviewable draft PRs, reflecting real bugs found and fixed.
- A concrete look at why `generate_sdk` matters: a client method that only exists after regeneration.
- Two transferable patterns: don't clobber persisted state with a file-based default on every restart (Track 1); use
  atomic, field-scoped merges for partial updates, not read-modify-write (Track 2).
