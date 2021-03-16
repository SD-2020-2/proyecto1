#!/bin/bash
# NO USAR !

echo '--- Eliminando Prometheus ---'
docker stop prome | xargs docker rm

echo '--- Eliminando Grafana ---'
docker stop grafana | xargs docker rm

echo '--- Creando 3 instancias ---'
/bin/bash create-instances.sh

echo ''
echo '--- Creando Prometheus ---'
#cd ..
/bin/bash middleware/prometheus/prometheus.sh

echo ''
echo '--- Creando Grafana ---'
#cd ..
/bin/bash middleware/grafana/grafana.sh
