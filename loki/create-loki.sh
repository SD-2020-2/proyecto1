#!/bin/bash
# Crea el contenedor loki puerto 3100

echo ''
echo 'lll - Creando contenedor Loki - lll'

docker run --name loki -d -p 3100:3100 grafana/loki:2.0.0 -config.file=/etc/loki/local-config.yaml
