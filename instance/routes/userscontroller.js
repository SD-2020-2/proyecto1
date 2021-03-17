const { createUser, refreshUsersList, getList } = require('../db/db');

const postUser = (req, res) => {
	console.log(req.body);
	createUser(req.body);
	res.sendStatus(200);
};

const getUser = (req, res) => {
	let infoAUx = getList();
	console.log(Object.values(infoAUx));
	//send(infoAUx);
	res.send(Object.values(infoAUx));
};

module.exports = {
	postUser,
	getUser,
	getList,
};
