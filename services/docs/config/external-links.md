# External links

Links inside a service's own docs that point outside its `docs/` folder - to a source file, another service's docs,
or similar - are, in the official published SciCatLive documentation site, rewritten to point at that file's location
in its own GitHub repository at the currently released tag, following the pattern `<repo_url>/blob/<tag>/<path>`.

Locally, this site aggregates documentation from several independent repositories under one shared `docs_dir`, so
there's no reliable way to know which upstream repository a given external link actually belongs to. Rather than
guess, and risk pointing at the wrong repository entirely, every such link here brings you back to this page instead
of a resolved path.
