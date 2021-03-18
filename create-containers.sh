#!/bin/bash

echo '--- Eliminando Prometheus ---'
docker stop prome | xargs docker rm

echo '--- Eliminando Grafana ---'
docker stop grafana | xargs docker rm

echo '--- Creando 3 instancias ---'
/bin/bash create-instances.sh

echo ''
echo '--- Creando Prometheus ---'
cd "$(pwd)"/prometheus
/bin/bash prometheus.sh

echo ''
echo '--- Creando Grafana ---'
cd ../grafana
/bin/bash grafana.sh

echo ''
echo '--- Creando Loki logging ---'
cd ../loki
/bin/bash create-loki.sh

echo ''
echo '--- OK ! :D ---'