#!/bin/bash

echo '... Analizando instancias ...'
docker stop $(docker ps -q --filter ancestor=instance) | xargs docker rm

docker rm $(docker ps -a -q)

docker rmi instance

echo ''
echo '... Construyendo imagen ...'
docker build -t instance .

echo ''
echo '... Iniciando instancias ...'
echo '... instance1 creada ...'
docker run --name instance1 -p 4000:4000 -d instance
echo ''
echo '... instance2 creada ...'
docker run --name instance2 -p 4001:4000 -d instance
echo ''
echo '... instance3 creada ...'
docker run --name instance3 -p 4002:4000 -d instance

# Ver las ips de los contenedores
#docker inspect -f '{{.Name}} {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q)