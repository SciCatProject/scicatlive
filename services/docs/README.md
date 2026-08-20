# [Docs](https://squidfunk.github.io/mkdocs-material/)

Serves a live, combined rendering of DEV-mode services' own upstream documentation (their `docs/` folder), together
with this repository's own top-level documentation, using MkDocs Material.

## Configuration options

### [index.md](./config/index.md)

The landing page served at the site root. Explains what the site is and links to the shared MkDocs configuration.

### [../../.github/mkdocs/](../../.github/mkdocs/)

The shared MkDocs configuration (theme, plugins, [hooks](../../.github/mkdocs/relative_to.py) and
[requirements](../../.github/mkdocs/requirements.txt)), the same one used to build the official published SciCatLive
documentation site.

## Default configuration

This service only exists once at least one of `DEV`, `BACKEND_DEV`, `FRONTEND_DEV` or `SCICATLIVE_DEV` is set (see
[DEV configuration](../../README.md#dev-configuration)) - `DEV=true` enables all of them, or each can be set
independently to enable only that one mount:

- `BACKEND_DEV`/`FRONTEND_DEV`: mounts that service's own `docs/` folder read-only from its `_dev` volume, at
  `/docs/<service>`
- `SCICATLIVE_DEV`: mounts this whole repository (read-write, unlike the per-service mounts) at `/docs/scicatlive`,
  so its own top-level documentation (e.g. this README) is rendered too

## Enable additional features

Each mount is gated independently, following the same pattern:

1. add a `compose.<service>.yaml` file with a `services: docs: volumes: [...]` entry adding a volume mount from
   that service's own `_dev` volume, using `subpath: docs`, targeting `/docs/<service>`
2. symlink `.compose.<service>.yaml` to [../.empty.yaml](../.empty.yaml), used when the service isn't enabled
3. add `.${<SERVICE>_DEV:+/}compose.<service>.yaml` to the `path:` list under `include:` in
   [compose.yaml](./compose.yaml)
4. add `<SERVICE>_DEV=${DEV:-${<SERVICE>_DEV:-}}` to [.env](./.env), so `DEV=true` also enables it - this defaulting
   is normally already defined in that service's own `.env` (e.g. `services/backend/.env`), but `.env` values are
   scoped to the directory they're read from, so it needs to be redefined here too for `services/docs/compose.yaml`
   to see it
5. add `<SERVICE>_DEV` to the `DOCS_DEV` fallback chain in [.env](./.env), so
   [compose.base.yaml](./compose.base.yaml) - and the docs service itself - gets pulled in once this flag alone is
   set
