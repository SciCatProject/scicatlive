# LDAP (OpenLDAP)

LDAP (Lightweight Directory Access Protocol) is a protocol used to access and manage directory information such as user credentials.
SciCat can use LDAP as third-party authentication provider.

## Configuration options

The OpenLDAP configuration is set by the [.env file](./config/.env).
For an extensive list of available options see [here](https://hub.docker.com/r/bitnami/openldap).

## Default configuration
In the default configuration [.env file](./config/.env),

## :warning: Caveat
`accessGroups` only works with backend v3
