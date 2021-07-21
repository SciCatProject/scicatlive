FROM nodered/node-red-docker
RUN npm install node-red-contrib-rdkafka
#COPY flows.json /data
WORKDIR /usr/src/node-red

CMD ["npm", "start", "--", "--userDir", "/data"]

