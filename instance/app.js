const express = require('express');
const server = express();
const port = 4000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(require('./routes/index.routes'));

server.listen(port, () => {
	console.log(`Instancia corriendo en ${port}`);
});
