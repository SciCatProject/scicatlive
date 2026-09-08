# SciCat cross-repo dev workshop

**Repos involved:** `backend`, `frontend`, `scicatlive`

An afternoon-length, hands-on workshop built around scicatlive: spin up the stack, find and fix a real bug, verify it,
and land the result as a draft PR. Two independent tracks, meant to be run in parallel by separate groups.

## Requirements

- **Docker** — version 29.7.2 (tested)
- **Docker Compose** — version 5.3.1 (tested)
- **VSCode**

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
git diff origin/main...HEAD -- \
  services/frontend/config/config.json \
  services/backend/services/v4/compose.base.yaml \
  services/backend/services/v4/config/frontend.config.json \
  services/backend/services/v4/config/.env
```

Do this once, before splitting into tracks:

1. **Spin up scicatlive in dev mode.**

   ```sh
   # Uncomment if ports 80/443 are already taken on your machine:
   #TRAEFIK_HTTP_PORT=81
   #TRAEFIK_HTTPS_PORT=444

   # Use a distinct project name per track/group so they don't collide:
   PROJECT_NAME=nobugs_track1   # or nobugs_track2
   DEV=true docker compose -p $PROJECT_NAME up -d
   ```

2. **Attach to the backend and frontend containers.** VSCode's "Attach to Running Container". Default shell is `sh`;
   `zsh` (with oh-my-zsh) is also installed if you prefer it.

3. **Checkout the pre-fixed branch, inside the frontend container.**

   ```sh
   git checkout be_conf
   ```

4. **Start the dev servers.**

   ```sh
   npm run start:dev
   ```

   in the backend container, and

   ```sh
   npm start -- --host 0.0.0.0
   ```

   in the frontend container (`--host 0.0.0.0` is required — the dev server otherwise only binds to localhost inside
   the container). The app is then at `http://localhost`, and the backend's Swagger explorer at
   `http://backend.localhost/explorer`.

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
