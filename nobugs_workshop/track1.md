# Track 1 — Config loading from the backend

**Repos involved:** `backend`, `frontend` (`be_conf` branch), `scicatlive`

## The story

The backend has a generic runtime-config store: named config blobs (like `frontendConfig`) in the database, with a
REST API to read and update them. Frontend [PR #2517](https://github.com/SciCatProject/frontend/pull/2517) adds
`additionalConfigs`, letting the frontend load part of its config from a configurable backend URL. Wiring those two
together is the obvious next step — and it surfaces a real bug in how the backend keeps its DB config in sync with
its file-based defaults.

## Step by step

Assumes the [shared setup](demo.md#shared-setup) is done.

1. **Reproduce the bug.** With the frontend at `http://localhost`, log in as admin, open `/admin/configuration`, edit
   a field, save, reload — confirm it stuck. Restart the backend (stop and re-run `npm run start:dev`). Reopen the
   editor: the edit is gone.

2. **Find the bug.** In
   [`runtime-config.service.ts`](https://github.com/SciCatProject/backend/blob/master/src/config/runtime-config/runtime-config.service.ts),
   `onModuleInit()` calls `syncConfig()` for every configured id on each startup. It's supposed to seed from file only
   if the DB entry is missing — but it always overwrites from file, even after an admin has edited it.

3. **Fix it.** Only seed from file when no DB entry exists yet; leave it alone otherwise. Optional, if time allows:
   add a unit test in
   [`runtime-config.service.spec.ts`](https://github.com/SciCatProject/backend/blob/master/src/config/runtime-config/runtime-config.service.spec.ts)
   covering both branches, run with `npm run test:api:jest`.

4. **Document the fix.** Add a note to the backend's own
   [`docs/frontend-config-guide/frontend-config.md`](https://github.com/SciCatProject/backend/blob/master/docs/frontend-config-guide/frontend-config.md):
   a seeded config is no longer overridden by the file on restart. Check it renders at `http://docs.localhost`.

5. **Commit and push the backend branch.** Open a PR for it.

6. **Verify end-to-end.** Restart the stack: the frontend picks up its config from the backend, and an admin-edited
   config now survives a full backend restart.

7. **Extend the config-merging that's already on the backend.** The frontend still composes its own config locally:
   base, OIDC, LDAP, and jobs fragments merged at startup by
   [`entrypoints/merge_json.sh`](../entrypoints/merge_json.sh). The backend side of that same mechanism is already
   wired on this branch (see the [shared setup](demo.md#shared-setup)), but only covers the base fragment so far.

   - Move `config.oidc.json`, `config.ldap.json`, and `config.jobs.json` — not `config.json` or `config.v3.json`,
     which stay put — from `services/frontend/config/` into `services/backend/services/v4/config/`.
   - Add a `volumes:` line for each in `services/backend/services/v4/compose.base.yaml`, mirroring the base
     fragment's and frontend's own numbering/enable-disable convention:
     `./config/config.oidc.json:/config/frontend.config.1${OIDC_ENABLED:+.json}:ro` for OIDC, `.2` for LDAP, `.3` for
     jobs.
   - Drop the now-dangling `frontend_config_oidc_json`/`frontend_config_ldap_json`/`frontend_config_jobs_json` mounts
     from `services/frontend/compose.base.yaml`.

8. **Update scicatlive's own documentation** to reflect the new default. Check it renders at `http://docs.localhost`.

9. **Lint the change.**

   ```sh
   FIX=true docker compose -f .github/compose.lint.yaml run --rm lintci
   ```

   Runs `lint` first (`ruff`, `eslint`, `markdownlint`, with `--fix`), then `lintci` (a full CI-equivalent check via
   `act`). Check the exit code: `0` is clean; otherwise read the logs and fix what they point at.

10. **Commit and push the scicatlive branch.** Open a draft PR: *"feat: load frontend config from backend, not static
    file."* Note: this only takes effect in DEV mode — outside of it, scicatlive still pulls a released frontend
    image tag, and PR #2517 isn't in any tagged release yet.

See also: [demo.md](demo.md) for the overview, and [Track 2](track2.md) for the PATCH-endpoint/`generate_sdk` track.
