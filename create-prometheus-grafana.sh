#!/bin/bash

echo '--- Eliminando Prometheus ---'
docker stop prome | xargs docker rm

echo '--- Eliminando Grafana ---'
docker stop grafana | xargs docker rm

echo ''
echo '--- Creando Prometheus ---'
cd "$(pwd)"/middleware/prometheus
/bin/bash prometheus.sh

echo ''
echo '--- Creando Grafana ---'
cd ../grafana
/bin/bash grafana.sh