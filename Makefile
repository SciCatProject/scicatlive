.PHONY: all run run-hot stop clean data

all : catanie/catanie catamel/catamel kafkanode/v20nodekafka
	docker-compose build
	
catanie/catanie :
	cd catanie && git clone https://github.com/SciCatProject/catanie.git

catamel/catamel :
	cd catamel && git clone https://github.com/SciCatProject/catamel.git

kafkanode/v20nodekafka :
	cd kafkanode && git clone https://github.com/garethcmurphy/v20nodekafka.git

stop :
	docker-compose down

run : all
	docker-compose down
	docker-compose up

run-hot :
	docker-compose -f docker-compose.yml -f docker-compose.hot.yml up --no-build

data :
	docker-compose -f docker-compose.data.yml build create-data
	docker-compose -f docker-compose.data.yml run create-data

clean :
	docker-compose rm -fsv
