const express = require('express');
const morgan = require('morgan');

const server = express();
const port = 2000;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(morgan('common'));
server.use(require('./routes/index.routes'));

//backUpdatabase();
//restoreDB();

server.listen(port, () => {
	console.log(`Middleware listening on port ${port}`);
});
