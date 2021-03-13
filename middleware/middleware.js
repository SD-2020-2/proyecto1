const express = require('express');
const server = express();
const port = 3000;

server.use(express.json());

server.use(require('./routes/index.routes'));

server.listen(port, () => {
	console.log(`Middleware listening on port ${port}`);
});
