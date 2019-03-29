FROM node:10-alpine as builder

RUN apk update && \
    apk add git

WORKDIR /var/catanie
COPY catanie .
RUN npm i --no-cache
RUN npx ng build --configuration=v20


FROM nginx
COPY catanie/scripts/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder  /var/catanie/dist/* /usr/share/nginx/html/
COPY --from=builder  /var/catanie/dist/assets/ /usr/share/nginx/html/assets/


EXPOSE 80
