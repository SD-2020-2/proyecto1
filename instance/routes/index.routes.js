const { Router } = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const router = Router();
router.use(bodyParser.text({ limit: '60mb' }));

const usersController = require('./userscontroller');
const { route } = require('../../middleware/routes/index.routes');

router.get('/', (req, res) => {
	console.log('Router get /');
	res.send('Router instancia funcionando !');
});

router.route('/users').post(usersController.postUser);
router.route('/getusers').get(usersController.getUser);
router.route('/getExcel').get(usersController.getExcel);

module.exports = router;
