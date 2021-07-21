./update.sh
docker-compose build
docker-compose up --build -d
docker-compose logs --follow
