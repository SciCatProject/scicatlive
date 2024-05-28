# Backend service

The SciCat backend HTTP service.

## Connection to MongoDB

The backend connects by default to the [mongodb service](./services/mongodb/).

## Dependency on `BE_VERSION`

The `BE_VERSION` value controls which version of the backend should be started, either [v3](./services/v3) or [v4](./services/v4) (default).
