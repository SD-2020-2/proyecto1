const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.send('Instancia working');
});

module.exports = router;
