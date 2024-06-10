# LDAP (OpenLDAP)

LDAP (Lightweight Directory Access Protocol) is a protocol used to access and manage directory information such as user credentials.
SciCat can use LDAP as third-party authentication provider.

## Configuration options

The OpenLDAP configuration is set by the [.env file](./config/.env).

For an extensive list of available options see [here](https://hub.docker.com/r/bitnami/openldap).

You can add other users by editing the [ldif file](./config/ldifs/02-users.ldif).
:warning: User creation is only done once, when the container is created.

## Default configuration
The default configuration [.env file](./config/.env) creates the `dc=facility` domain with the following user:

| Username  | Password |
| --------- | -------- |
| ldap-user | password |
