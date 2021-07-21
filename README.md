# SciCat

Files for running SciCat with docker-compose.


## Steps

1. Clone the repository
```sh
git clone https://gitlab.esss.lu.se/swap/scicat.git
```
2. Run `docker-compose up -d`

3. SciCat will now be available on `http://localhost`. The Loopback API explorer is available at `http://localhost/explorer/`


## Add LDAP Authentication

1. Add your LDAP configuration to `./config/catamel/providers.json`

2. Uncomment the volumes section for the catamel service in `docker-compose.yaml`