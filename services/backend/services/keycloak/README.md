# Keycloak (OIDC Identity provider)

OIDC is an authentication protocol that verifies user identities when they sign in to access digital resources.
SciCat can use an OIDC service as third-party authentication provider.

## Configuration options

The Keycloak configuration is set by the [.env file](./config/.env) and the realm created is in [facility-realm.json file](./config/facility-realm.json).

For an extensive list of available options see [here](https://www.keycloak.org/guides#server).

:warning: Realm creation is only done once, when the container is created.

## Default configuration
The default configuration [.env file](./config/.env) creates the `admin` user with the `admin` password.
Administration web UI is available at `http://keycloak.localhost`

Also a realm called `facility` is created with the following user and group:

| Username  | Password | Group |
| --------- | -------- | ----- |
| oidc-user | password | aGroup|

The users' groups are passed to SciCat backend via the OIDC ID Token, in the claim named `accessGroups` (an array of strings).
The name of the claim can be configured either in [login-callbacks.js](../v3/config/login-callbacks.js) for v3 or with [environment variables](../v4/config/.oidc.env) for v4.
