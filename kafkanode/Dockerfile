FROM node:11.12
RUN apt-get update && apt-get install -y vim kafkacat

COPY v20nodekafka/package.json /usr/src/app/

WORKDIR /usr/src/app/

RUN npm install

COPY v20nodekafka/kafka.js /usr/src/app/
CMD ["node","kafka.js"]
