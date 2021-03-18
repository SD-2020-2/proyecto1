const express = require('express');

const server = express();
const port = 2000;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(require('./routes/index.routes'));

const axios = require('axios');
const redis = require('redis');
const app = express();

server.get('/', (req, res) => {
	res.send('estoy listo pa escuchar');
});

server.listen(port, () => {
	console.log(`Middleware listening on port ${port}`);
});

//backUpdatabase();
//restoreDB();

//hacer la busqueda por ciudad
//enviar esos datos a la cache
//hacer la consulta postman
