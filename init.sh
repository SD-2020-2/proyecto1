#!/bin/bash

echo ''
echo '**** Deteniendo contenedores ****'
docker stop $(docker ps -q)

echo ''
echo '**** Eliminando residuos ****'
docker rm $(docker ps -a -q)

echo ''
echo '**** Iniciando ****'
echo '**** Creando contenedor Mongo ****'
docker run --name mongo -d mongo

echo ''
echo '**** Creando contenedores ****'
/bin/bash create-containers.sh

echo ''
echo '**** :D Finished :D ! ****'