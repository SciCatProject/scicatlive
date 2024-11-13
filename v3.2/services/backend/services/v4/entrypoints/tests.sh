#!/bin/sh

## Setting the --runInBand makes the tests run sequentially, 
## avoiding to fill the RAM which makes them freeze
npm run test -- --runInBand

npm start &
PID="${!}"
sleep 30
npm run test:api:mocha

kill "${PID}"
