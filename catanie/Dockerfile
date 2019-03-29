FROM node:10-alpine	FROM node:10-alpine as builder


 RUN apk update && \	RUN apk update && \
    apk add git 	    apk add git


 WORKDIR /var/catanie	WORKDIR /var/catanie
COPY catanie .	COPY catanie .
RUN npm i --no-cache	RUN npm i --no-cache
RUN npx ng build --configuration=v20


 ENTRYPOINT ["npm", "run", "ng"]	
 CMD ["serve","--","--configuration", "v20"]
 
 
 
