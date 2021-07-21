FROM mongo:4.1.5

COPY scripts /var/scripts
RUN apt-get update && apt-get install -y netcat

CMD ["/bin/sh", "/var/scripts/wait-for.sh", "catamel:3000", "-t", "120", "--", \
    "mongo", "--host", "mongodb://mongodb:27017", "/var/scripts/create-index.js"]
