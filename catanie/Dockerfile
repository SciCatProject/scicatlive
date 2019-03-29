
FROM node:10-alpine

RUN apk update && \
    apk add git 

WORKDIR /var/catanie
COPY catanie .
RUN npm i --no-cache

ENTRYPOINT ["npm", "run", "ng"]
CMD ["serve","--","--configuration", "v20"]
