FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY instance/package*.json ./

RUN npm install

RUN npm install pm2 -g

# Bundle app source
COPY instance/. .

RUN wget https://github.com/prometheus/node_exporter/releases/download/v1.1.2/node_exporter-1.1.2.linux-amd64.tar.gz -q --show-progress --progress=bar:force 2>&1

RUN tar xvfz node_exporter-1.1.2.linux-amd64.tar.gz

CMD [ "pm2-runtime", "npm", "--", "start" ]