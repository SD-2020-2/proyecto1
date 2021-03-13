const { Router } = require('express');
const usersController = require('./userscontroller');
const router = Router();

router.get('/', (req, res) => {
	res.send('Instancia working');
});

router.route('/users').post(usersController.postUser);
router.route('/users').get(usersController.getUser);

module.exports = router;
