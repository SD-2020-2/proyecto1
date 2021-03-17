#!/bin/bash

echo '... Analizando instancias ...'
docker stop $(docker ps -q --filter ancestor=instance) | xargs docker rm

docker rm $(docker ps -a -q)

docker rmi instance

echo ''
echo '... Reconstruyendo imagen ...'
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

echo ''
echo '... Iniciando node_exporter ...'
echo '...       instance1 ...'
docker exec instance1 ./node_exporter-1.1.2.linux-amd64/node_exporter &

echo ''
echo '...       instance2 ...'
docker exec instance2 ./node_exporter-1.1.2.linux-amd64/node_exporter &

echo ''
echo '...       instance3 ...'
docker exec instance3 ./node_exporter-1.1.2.linux-amd64/node_exporter &

# Ver las ips de los contenedores
#docker inspect -f '{{.Name}} {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q)