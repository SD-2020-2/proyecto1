const { Router } = require('express');
const router = Router();

const usersController = require('./userscontroller');

router.get('/', (req, res) => {
	console.log('Router get /');
	res.send('Router instancia funcionando !');
});

router.route('/users').post(usersController.postUser);
router.route('/agregar').post(usersController.postUser);
router.route('/getusers').get(usersController.getUser);

module.exports = router;
