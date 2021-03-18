const { Router } = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const router = Router();
router.use(bodyParser.text({ limit: '60mb' }));

const usersController = require('./userscontroller');

router.get('/', (req, res) => {
	logger.log('info', `Router get /`);
	res.send('Router instancia funcionando !');
});

router.route('/users').post(usersController.postUser);
router.route('/getusers').get(usersController.getUser);
router.route('/getExcel').get(usersController.getExcel);

module.exports = router;
