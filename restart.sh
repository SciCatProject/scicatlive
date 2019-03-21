  docker-compose  stop kafkanode
  docker-compose rm kafkanode
./update.sh
  docker-compose build
  docker-compose up -d
  docker-compose  logs -f
