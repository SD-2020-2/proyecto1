#!/bin/bash

echo '... Creando contenedor Grafana ...'

docker run --name grafana -d --rm -p 3000:3000 \
  -e GF_AUTH_DISABLE_LOGIN_FORM=true \
  -e GF_AUTH_ANONYMOUS_ENABLED=true \
  -e GF_AUTH_ANONYMOUS_ORG_ROLE=Admin \
  -v "$(pwd)"/datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml \
  grafana/grafana:7.1.5

echo 'ŋŋŋ- Instalando pie chart en contenedor grafana -ŋŋŋ'
docker exec grafana grafana-cli plugins install grafana-piechart-panel

echo 'ŋŋŋ- Reiniciando Grafana -ŋŋŋ'
docker restart grafana

  #http://localhost:3000
  # ver el contenido de datasources.yml del contenedor
  #docker exec -it grafana cat /etc/grafana/provisioning/datasources/datasources.yml