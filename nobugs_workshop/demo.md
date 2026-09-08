# SciCat cross-repo dev workshop

**Repos involved:** `backend`, `frontend`, `scicatlive`

This is a hands-on, afternoon-length workshop built around **scicatlive**, the multi-repo dev environment that runs
SciCat's backend and frontend together. It's aimed at teaching the actual muscle memory of contributing to SciCat as a
real, multi-repo open-source project: spinning up the stack, attaching to containers, finding and fixing bugs,
regenerating the shared SDK, verifying behavior end-to-end, and landing changes as draft PRs.

## Requirements

- **Docker** — version 29.7.2 (tested)
- **Docker Compose** — version 5.3.1 (tested)
- **VSCode**

## Shared setup

Both tracks build on the same running stack, and both need the frontend's admin config editor from
[PR #2517 — "feat: allow loading configs from other sources"](https://github.com/SciCatProject/frontend/pull/2517)
(branch `be_conf`) to already be checked out — Track 1 wires the config-loading mechanism that PR adds, and Track 2's
admin-editor save flow is built directly on top of the editor that PR introduces.

scicatlive itself already ships wired so the frontend loads (part of) its config from the backend by default — this is
scicatlive-level configuration, not application code, and it already lives on this branch across four files, so there's
nothing to do here, just what to know before the steps below:

[`services/frontend/config/config.json`](../services/frontend/config/config.json) — points `additionalConfigs` at the
backend's own `GET /api/v3/admin/config` endpoint, which returns the runtime-config `frontendConfig` document already
unwrapped to just its `data`:

```diff
 {
    "lbBaseURL": "${BACKEND_URL}",
    "jobsEnabled": false,
-   "oAuth2Endpoints": []
+   "oAuth2Endpoints": [],
+   "additionalConfigs": ["${BACKEND_URL}/api/v3/admin/config"]
 }
```

[`services/backend/services/v4/compose.base.yaml`](../services/backend/services/v4/compose.base.yaml) — mounts the
same [`entrypoints/merge_json.sh`](../entrypoints/merge_json.sh) the frontend uses (at `/docker-entrypoints/05.sh`, so
it runs before the existing `db_migration_sh` at `10.sh`), plus a new base config fragment mounted at
`/config/frontend.config.0.json`:

```diff
     volumes:
+      - ${PWD}/entrypoints/merge_json.sh:/docker-entrypoints/05.sh:ro
+      - ./config/frontend.config.json:/config/frontend.config.0.json:ro
     entrypoint:
       - loop_entrypoints.sh
       - docker-entrypoint.sh
     command: node dist/main
     ...
     environment:
+      CONFIG_FILE: frontend.config
+      CONFIG_DIR: /config
+      BACKEND_URL: ${_BACKEND_HTTPS_URL}
```

[`services/backend/services/v4/config/frontend.config.json`](../services/backend/services/v4/config/frontend.config.json)
— the new fragment being mounted above, a brand-new file:

```diff
+{
+    "lbBaseURL": "${BACKEND_URL}"
+}
```

`CONFIG_DIR`/`CONFIG_FILE` tell `merge_json.sh` to merge everything under `/config/frontend.config.*.json` into
`/config/frontend.config` — right now that's just the one base fragment; Track 1 extends it to the rest.

[`services/backend/services/v4/config/.env`](../services/backend/services/v4/config/.env) — tells the backend to seed
`frontendConfig` from that merged file instead of its own bundled default:

```diff
 SAMPLE_GROUPS=ingestor
+FRONTEND_CONFIG_FILE=/config/frontend.config
```

Together, these four changes close the loop: on a fresh database, the backend seeds `frontendConfig` with a
`lbBaseURL` pointing at itself, and the frontend's `additionalConfigs` fetches exactly that document and merges it in.
Out of the box, scicatlive already demonstrates the frontend loading part of its configuration from the backend — which
is the behavior Track 1 investigates and Track 2 edits through the admin UI.

One more thing that's already set on this branch: [`services/frontend/.env`](../services/frontend/.env) pins
`GITHUB_REPO` to [PR #2517](https://github.com/SciCatProject/frontend/pull/2517)'s `be_conf` branch, so the frontend
dev container checks it out automatically the first time its dev volume is created — no manual checkout needed.

With all that in mind, do this once, before splitting into tracks:

1. **Spin up scicatlive in dev mode.**

   ```sh
   ## Uncomment if ports 80/443 are already taken on your machine:
   #TRAEFIK_HTTP_PORT=81
   #TRAEFIK_HTTPS_PORT=444

   ## Use a distinct project name per track/group so they don't collide:
   PROJECT_NAME=nobugs_track1   # or nobugs_track2
   DEV=true docker compose -p $PROJECT_NAME up -d
   ```

   This brings up the stack in dev mode, giving each enabled component a bare dev environment (git, the language
   runtime, test tooling) instead of running its production server — and, since it's already wired as described above,
   the frontend loads its config from the backend from the start.

2. **Attach to the backend and frontend containers.** Use VSCode's "Attach to Running Container" (the workflow
   scicatlive's own docs recommend) to attach to both. The container's default shell is `sh`; `zsh` (with oh-my-zsh)
   is also installed via [`entrypoints/add_shell_tools.sh`](../entrypoints/add_shell_tools.sh) if you prefer it — just
   run `zsh`.

3. **Start the dev servers.** DEV mode only gives each service a bare dev environment — nothing runs until you start
   it, and both tracks need the servers actually up (Track 2's first step, for instance, calls the live `PUT`
   endpoint). In the backend container:

   ```sh
   npm run start:dev
   ```

   (`start:dev` runs in watch mode, so edits made while working the bug in either track are picked up without a
   manual restart; plain `npm start` also works but won't reload on changes.) In the frontend container:

   ```sh
   npm start -- --host 0.0.0.0
   ```

   The `--host 0.0.0.0` is required in DEV mode per scicatlive's frontend docs: the dev server binds to localhost only
   by default, which isn't reachable from outside the container. Once both are up, the app is at `http://localhost` in
   a browser (scicatlive's Traefik proxy routes there by default), and the backend's Swagger explorer at
   `http://backend.localhost/explorer`.

From here the group splits: [Track 1](track1.md) starts on the backend container, [Track 2](track2.md) also starts on
the backend container but with a different bug in view.

The workshop is split into two independent tracks that both revolve around the same piece of infrastructure: the
backend's generic runtime-config store (a key-value collection where named configuration blobs, like `frontendConfig`,
live in the database with a REST API to read and update them) and the frontend's `additionalConfigs` mechanism for
loading part of its configuration from an external URL instead of only its bundled static `config.json`. Together, the
two tracks are what let an admin user change frontend config settings from the frontend itself, regardless of where the
backend is deployed: Track 1 makes the frontend load its config from the backend at all (and makes sure that config
survives a backend restart), and Track 2 makes editing a single setting through the admin UI safe to do without wiping
out everything else.

## The two tracks

- **[Track 1 — Config loading from the backend](track1.md)**
  Wires the frontend's config loading to the backend's config endpoint instead of a static file, and along the way
  surfaces and fixes a real bug: the backend's `RuntimeConfigService.onModuleInit()` unconditionally overwrites the
  database config from file on every restart, silently wiping any customization made through the admin UI. No SDK impact
  — this is application logic and configuration wiring, not an API contract change. Landing the change involves two
  PRs: the backend fix (with a doc note in the backend's own `docs/frontend-config-guide/frontend-config.md`), and a
  `scicatlive` PR that also moves the frontend's config-merging logic (base/OIDC/LDAP/jobs fragments) onto the backend
  side, updates scicatlive's own docs, and runs scicatlive's linting.

- **[Track 2 — A PATCH endpoint: proving why `generate_sdk` matters](track2.md)**
  Starts from a real bug (the existing `PUT` endpoint does a full replace, so a partial update silently deletes every
  other config field) and fixes it properly with an atomic, RFC 7396-style JSON Merge Patch endpoint. The centerpiece of
  this track is watching `generate_sdk` run and produce a `runtimeConfigControllerPatchConfigV3()` client method that
  simply didn't exist a moment before — then wiring that call into the real admin editor so two people can edit
  different config sections concurrently without clobbering each other. Lands as two PRs too: backend and frontend.

## Why these two tracks, together

Both tracks center on the same runtime-config subsystem, so participants build a real, working mental model of one piece
of the system rather than touring shallow examples across the codebase. Each track produces exactly one new piece of
backend logic, chosen because it teaches something that generalizes well beyond SciCat:

- Track 1: don't clobber persisted state with a default on every restart — a pattern that recurs anywhere a system
  reconciles a mutable database record against an immutable startup-time default.
- Track 2: partial updates need atomic, field-scoped merge semantics, not read-modify-write — a pattern that recurs
  anywhere concurrent clients can update different parts of the same document.

Everything else — checking out branches, attaching to containers, regenerating the SDK, running tests, verifying
behavior, opening draft PRs — is deliberately the same shape in both tracks, because that repeated shape *is* the
workflow being taught, not incidental scaffolding around it.

## What participants leave with

- A working scicatlive dev setup they've driven themselves, across both the backend and frontend containers.
- Up to four real, reviewable draft PRs (backend + scicatlive from Track 1, backend + frontend from Track 2)
  reflecting bugs they found and fixed, not toy exercises.
- A concrete, seen-not-just-told understanding of why `generate_sdk` matters: a client method appearing only after
  regeneration, immediately usable with full type safety.
- Direct experience of the "seed vs. overwrite" and "atomic partial update" patterns, transferable to any project with a
  mutable-store-vs-static-default or concurrent-partial-update shape.
