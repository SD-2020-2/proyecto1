const { Router } = require('express');
const express = require('express');
const usersController = require('./userscontroller');
const router = Router();

router.get('/', (req, res) => {
	res.send('Instancia working');
});

router.route('/users').post(usersController.postUser);
router.route('/agregar').post(usersController.postUser);
router.route('/getusers').get(usersController.getUser);

module.exports = router;
