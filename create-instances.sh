docker stop $(docker ps -q --filter ancestor=instance) | xargs docker rm

docker rmi instance

docker build -t instance .

docker run --name instance1 -p 4000:4000 -d instance
docker run --name instance2 -p 4001:4000 -d instance
docker run --name instance3 -p 4002:4000 -d instance