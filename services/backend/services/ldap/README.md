# [LDAP (GLAuth)](https://glauth.github.io/)

LDAP (Lightweight Directory Access Protocol) is a protocol used to access and manage directory information such as user
credentials. SciCat can use LDAP as third-party authentication provider.

## Configuration options

The GLAUth configuration is defined in the [glauth.conf file](./config/glauth.conf).

For an extensive list of available options see the [GLAuth docs](https://glauth.github.io/docs/).

You can add other users by editing the [configuration file](./config/glauth.conf).

## Default configuration

The default configuration creates the `dc=facility` domain with the following user:

| Username  | Password |
|-----------|----------|
| ldap-user | password |

## Enable additional features

No additional features.
