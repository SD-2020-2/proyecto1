FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY instance/package*.json ./

RUN npm install

# Instalar pm2
RUN npm install pm2 -g

# Bundle app source
COPY instance/. .

# Descargar node_exporter para el monitoreo
RUN wget https://github.com/prometheus/node_exporter/releases/download/v1.1.2/node_exporter-1.1.2.linux-amd64.tar.gz -q --show-progress --progress=bar:force 2>&1

RUN tar xvfz node_exporter-1.1.2.linux-amd64.tar.gz

# Descargar promtail para el logging
WORKDIR /usr/src/app/promtail-conf

RUN wget https://github.com/grafana/loki/releases/download/v2.2.0/promtail-linux-amd64.zip -q --show-progress --progress=bar:force 2>&1

RUN unzip promtail-linux-amd64.zip

RUN chmod a+x promtail-linux-amd64

# Retornar al directorio src/app
WORKDIR /usr/src/app

# Iniciar instancia con pm2
CMD [ "pm2-runtime", "npm", "--", "start" ]