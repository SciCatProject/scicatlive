# SciCatLive Documentation

This site renders each service's own upstream documentation (its `docs/` folder), live from the checkout running in
this DEV environment - not a separate, hand-written set of pages.

It's only available when running with `DEV=true`: each service's documentation is only present once that service's
own container has cloned its repository, so what you see here reflects whatever branch/commit is currently checked
out in your local dev containers, not necessarily the latest released version.

## Configuration and adding a service

See the [docs README](scicatlive/services/docs/README.md) for the shared MkDocs configuration this site uses, and for
how to add or change which service's documentation is served here.

## Caveats

Because every service is rendered with this shared configuration rather than whatever tooling (if any) it uses
upstream, the result can differ from how that service renders or publishes its own docs elsewhere - available
plugins, Markdown extensions and styling all follow this repo's setup, not the upstream project's. Each service's
documentation is also normally authored assuming it is the root of its own site, which no longer holds once
aggregated here.
