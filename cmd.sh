./update.sh
docker-compose build
docker-compose up --build --detach
docker-compose logs --follow
