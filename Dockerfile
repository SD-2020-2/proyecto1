FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY instance/package*.json ./

RUN npm install

# Bundle app source
COPY instance/. .

CMD [ "node", "app.js" ]