const express = require('express');
const app = express();
const port = 3000;

const { restoreDB, backUpdatabase } = require('./db/db-manager');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(require('./routes/routes'));
//app.use(express.static('public'));

backUpdatabase();
restoreDB();

app.listen(port, () => {
	console.log(`Middleware listening on port: ${port}`);
});

