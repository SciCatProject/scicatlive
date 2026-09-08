# Track 1 — Config loading from the backend: a cross-repo dev workflow

**Repos involved:** `backend`, `frontend` (pre-fixed [PR #2517](https://github.com/SciCatProject/frontend/pull/2517)
branch, `be_conf`), `scicatlive`
**What this teaches:** how to actually *work* on SciCat day to day — running scicatlive in dev mode, moving between two
attached containers, finding and fixing a real bug, testing it, and landing the result as a draft PR upstream.

## The story

SciCat's frontend can load part of its configuration from an external URL instead of only from its bundled static
`config.json`, via a mechanism (`additionalConfigs`) added in frontend
[PR #2517 — "feat: allow loading configs from other sources"](https://github.com/SciCatProject/frontend/pull/2517).
Separately, the backend already has a generic runtime-config store — a small key-value collection where arbitrary named
configuration blobs (like `frontendConfig`) can live in the database rather than only in a file, with a REST API to read
and update them.

Putting those two things together is the obvious next step: point the frontend's config loading at the backend's config
endpoint instead of a static file. That's what this track builds, live — and along the way, it surfaces a real,
previously-unnoticed bug in how the backend keeps that database config in sync with its file-based defaults.

## Step by step

Assumes the [shared setup](demo.md#shared-setup) is done: scicatlive running in dev mode, both containers attached, and
the frontend container checked out on the `be_conf` branch.

1. **Reproduce the bug first.** With the frontend running at `http://localhost` (from the shared setup), log in as an
   admin and open the config editor at `/admin/configuration`. Edit a field, save, and reload the editor to confirm it
   stuck. Now restart the backend process (stop `npm run start:dev` in its container and run it again) and reopen the
   editor: the edit is gone.

2. **Backend: find the bug.** On every application startup, the backend's `RuntimeConfigService.onModuleInit()` (in
   [`src/config/runtime-config/runtime-config.service.ts`](https://github.com/SciCatProject/backend/blob/master/src/config/runtime-config/runtime-config.service.ts))
   walks a configured list of config IDs and calls `syncConfig()` for each. That method's job is to make sure each
   config exists in the database, seeded from the corresponding config file the first time. The problem: it doesn't stop
   there. Every time it runs — including on every restart — it unconditionally **overwrites** the database entry with
   the file's contents again, even if an admin has since edited that config through the admin UI. In other words, any
   customization made via the admin editor is silently wiped the next time the backend restarts. This is a genuine,
   easy-to-miss bug: the "seed if missing" and "always overwrite" cases were never actually separated.

3. **Backend: fix it.** The fix is a small, well-scoped change: only seed the config from the file when no database
   entry exists yet; once it exists, leave it alone unless someone explicitly edits it via the API. Optional, if time
   allows — the fix itself is the core deliverable here, not the test — add a unit test covering both branches in
   [`runtime-config.service.spec.ts`](https://github.com/SciCatProject/backend/blob/master/src/config/runtime-config/runtime-config.service.spec.ts)
   (no existing doc → seeded from file; existing doc → left untouched even though the file is present). Run the tests
   with `npm run test:api:jest`.

4. **Document the fix in the backend's own docs.** In the backend container, add a note to
   [`docs/frontend-config-guide/frontend-config.md`](https://github.com/SciCatProject/backend/blob/master/docs/frontend-config-guide/frontend-config.md)'s
   overview, documenting the fix from step 3: once a config value is seeded in the database, it is no longer overridden
   by the file on subsequent restarts. Check it renders at `http://docs.localhost` (comes up automatically whenever
   `DEV=true`, built with MkDocs), under the backend's own section — this is backend-repo content, so it belongs in the
   same branch and PR as the code fix, not tacked on afterwards.

5. **Commit and push the backend branch.** Open a PR for it.

6. **Verify end-to-end.** With both changes in place, restart the stack and confirm: the frontend picks up its config
   from the backend rather than only the static file, and — thanks to the backend fix — a config edited through the
   admin UI survives a full backend restart instead of reverting to defaults.

7. **Extend the config-merging that's already on the backend.** The frontend still composes its own config locally
   today: the base, OIDC, LDAP, and jobs fragments get merged at container startup by
   [`entrypoints/merge_json.sh`](../entrypoints/merge_json.sh) into the one file the app actually reads. The backend
   side of that same mechanism is already wired on this branch — see the
   [shared setup](demo.md#shared-setup) — but it only covers the base fragment so far. Extend it to the rest:

   - **Move the fragment files.** Move `config.oidc.json`, `config.ldap.json`, and `config.jobs.json` — not
     `config.json` or `config.v3.json`, which stay put — from `services/frontend/config/` into
     `services/backend/services/v4/config/`; the backend composes them now, not the frontend.
   - **Add a `volumes:` line for each**, in `services/backend/services/v4/compose.base.yaml`, mirroring the existing
     one for the base fragment and frontend's own numbering + enable/disable convention:
     `./config/config.oidc.json:/config/frontend.config.1${OIDC_ENABLED:+.json}:ro` for OIDC, `.2` for LDAP, `.3` for
     jobs.
   - **Drop the now-dangling references in `services/frontend/compose.base.yaml`**: the
     `frontend_config_oidc_json`/`frontend_config_ldap_json`/`frontend_config_jobs_json` mounts and their `file:`
     entries, since those files no longer live there. The frontend now gets OIDC/LDAP/jobs defaults from the backend's
     seeded config via `additionalConfigs`, not from a local merge.

8. **Update scicatlive's own documentation.** Reflect the new default — the frontend now loads (part of) its config from
   the backend out of the box, not just from local fragments. Check it renders at `http://docs.localhost`, under
   scicatlive's top-level docs section.

9. **Lint the change.**

   ```sh
   FIX=true docker compose -f .github/compose.lint.yaml run --rm lintci
   ```

   Runs scicatlive's own lint suite twice, one after the other: `lint` first (`ruff`, `eslint`, `markdownlint`, with
   `FIX=true` passing `--fix` through so straightforward issues are corrected automatically), then `lintci` (a full
   CI-equivalent check via `act`, simulating the actual GitHub Actions workflow, no fixing). Check the exit code once
   both are done: `0` means it's clean; anything else means read the logs above and fix what they point at (`--fix`
   doesn't catch everything, e.g. line-length issues it can't safely rewrap on its own).

10. **Commit and push the scicatlive branch.** Open a **draft PR** in `scicatlive`: *"load frontend config from backend,
    not static file."* This — alongside the backend PR from step 5 — is the artifact the group actually leaves behind: a
    real, reviewable contribution reflecting what they just built and verified. Note that this default wiring will only
    actually take effect when scicatlive is run in DEV mode: outside of DEV mode, scicatlive still pulls a released
    frontend image tag, and PR #2517's `additionalConfigs` mechanism isn't in any tagged frontend release yet — so until
    it is, this PR is forward-looking, not yet functional against the default (non-DEV) frontend.

See also: [demo.md](demo.md) for the overview, and [Track 2](track2.md) for the PATCH-endpoint/`generate_sdk` track.
