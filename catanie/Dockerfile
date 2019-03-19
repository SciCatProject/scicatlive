FROM node:10-alpine

RUN apk update && \
    apk add git && \
    npm i -g npm@6.1.0

WORKDIR /var/catanie
COPY catanie .
RUN npm i --no-cache

ENTRYPOINT ["npm", "run", "ng"]
CMD ["serve"]
