const express = require('express');
const morgan = require('morgan');

const server = express();
const port = 2000;

const client = require('prom-client');
const register = new client.Registry();

register.setDefaultLabels({
	app: 'example-nodejs-app',
});

client.collectDefaultMetrics({ register });

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(morgan('common'));
server.use(require('./routes/index.routes'));

server.get('/metrics', (req, res) => {
	res.send(register.metrics());
});

//backUpdatabase();
//restoreDB();

server.listen(port, () => {
	console.log(`Middleware listening on port ${port}`);
});
