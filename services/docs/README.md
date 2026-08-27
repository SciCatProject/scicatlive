# [Docs](https://squidfunk.github.io/mkdocs-material/)

Serves a live, combined rendering of every DEV-mode service's own upstream documentation (its `docs/` folder) using
MkDocs Material.

## Configuration options

### [index.md](./config/index.md)

The landing page served at the site root. Explains what the site is and links to the shared MkDocs configuration.

### [../../.github/mkdocs/](../../.github/mkdocs/)

The shared MkDocs configuration (theme, plugins, [hooks](../../.github/mkdocs/relative_to.py) and
[requirements](../../.github/mkdocs/requirements.txt)), the same one used to build the official published SciCatLive
documentation site.

## Default configuration

Only available when running with `DEV=true` (see [DEV configuration](../../README.md#dev-configuration)). Each
listed service's own `docs/` folder is mounted read-only from its `_dev` volume at `/docs/<service>`, and served
together at the site root.

## Enable additional features

To render another service's documentation here, add both of the following to [compose.yaml](./compose.yaml):

- a volume mount from that service's own `_dev` volume, using `subpath: docs`, targeting `/docs/<service>`
