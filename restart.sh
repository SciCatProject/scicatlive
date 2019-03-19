  docker-compose  stop nodered
  docker-compose rm nodered
  docker-compose build
  docker-compose up -d
  docker-compose  logs -f
