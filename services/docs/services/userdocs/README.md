# [Userdocs](https://github.com/SciCatProject/user-documentation)

Clones an external repository of user-facing documentation, so it can be rendered by the [docs](../../) service
alongside the other services' own docs.

## Configuration options

Set in [.env](./.env):

- `GITHUB_REPO`: the repository to clone
- `APP`/`WORKDIR`: the name/mount path used for this checkout - also determines the URL it's served at, since
  [compose.userdocs.yaml](../../compose.userdocs.yaml) targets `/docs/user-documentation`

## Default configuration

On first start, [clone_git.sh](./entrypoints/clone_git.sh) clones `GITHUB_REPO` into the `userdocs_dev` volume at
`WORKDIR`. Unlike [setup_git.sh](../../../../entrypoints/setup_git.sh), used by the other DEV services, this doesn't
track a specific branch/tag or re-sync on restart - it only clones once, and a failed clone doesn't stop the
container from starting.

## Enable additional features

Enabled by `USER_DOCS_DEV=true` (or `DEV=true`) - see the [docs README](../../README.md) for how this and the other
per-service mounts are gated.
