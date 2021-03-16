#!/bin/bash

echo '... Creando contenedor Prometheus ...'

docker run --name prome -d --rm -p 9090:9090 -v "$(pwd)"/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus:v2.20.1

#http://localhost:9090