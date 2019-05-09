FROM node:9.11.1-alpine

RUN apk update && \
    apk add make  \
    python  \
    git
WORKDIR /var/catamel

COPY catamel/package.json catamel/package-lock.json ./
RUN npm i 

COPY catamel .
COPY server server/

COPY wait-for.sh /var
CMD ["/bin/sh", "/var/wait-for.sh", "mongodb:27017", "--", "node", "."]
