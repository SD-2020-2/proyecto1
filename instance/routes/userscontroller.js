const { createUser, refreshUsersList } = require('../db/db');
const postUser = (req, res) => {
	console.log(req.body);
	createUser(req.body);
	res.sendStatus(200);
};

const getUser = (req, res) => {
	let infoAUx = refreshUsersList();
	res.sendStatus(200).send(infoAUx);
};

module.exports = {
	postUser,
	getUser,
};
