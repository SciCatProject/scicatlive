# SciCatLive Documentation

This site renders each service's own upstream documentation (its `docs/` folder), live from the checkout running in
this DEV environment - not a separate, hand-written set of pages.

It's only available when running with `DEV=true`: each service's documentation is only present once that service's
own container has cloned its repository, so what you see here reflects whatever branch/commit is currently checked
out in your local dev containers, not necessarily the latest released version.

## Shared styling and configuration

Every service's docs are rendered using the same MkDocs configuration, theme and plugins:

- mkdocs.yaml: `./.github/mkdocs/mkdocs.yaml`
- theme overrides: `./.github/mkdocs/overrides`
- relative_to.py hook: `./.github/mkdocs/relative_to.py`
- requirements.txt: `./.github/mkdocs/requirements.txt`

These are the same files used to build the official published SciCatLive documentation site.

## Adding or changing a service here

Each service listed here is mounted explicitly, not discovered automatically: to add a new service, or change which
one of an existing service's folders is served, edit the volume mounts in
`services/docs/compose.yaml`
adding a `subpath: docs` mount from that service's own `_dev` volume onto `/docs/<service>`.

## Caveats

Because every service is rendered with this shared configuration rather than whatever tooling (if any) it uses
upstream, the result can differ from how that service renders or publishes its own docs elsewhere - available
plugins, Markdown extensions and styling all follow this repo's setup, not the upstream project's. Links between two
services' docs, or to files outside a given service's `docs/` folder, may also not resolve, since each service's
documentation is normally authored assuming it is the root of its own site.
