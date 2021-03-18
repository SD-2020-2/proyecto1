const { Router } = require('express');
const express = require('express');
const axios = require('axios');
var fs = require('fs');
const router = Router();
router.use(express.json());
router.use(express.text({ limit: '60mb' }));
var urlimage;

function base64_encode(file) {
	// read binary data
	var bitmap = fs.readFileSync(file);
	// convert binary data to base64 encoded string
	return new Buffer(bitmap).toString('base64');
}

router.get('/enviar', (req, res) => {
	urlimage = base64_encode('./public/prueba.jpg');
	var url = `http://{}:4000/users`;
	let base64Image = urlimage;
	axios({
		method: 'post',
		url: url,
		data: {
			CEDULA: '345546456',
			NOMBRE: 'Andrea Echeverry',
			CIUDAD: 'Cali',
			FOTO: base64Image,
		},
	})
		.then((response) => {
			console.log(response.data);
		})
		.catch((e) => {
			console.log(e);
		});
	res.send('llego');
});

router.get('/getExcel', (req, res) => {
	var url = `http://localhost:4000/getExcel`;
	axios({
		method: 'get',
		url,
	})
		.then((response) => {
			let buff = new Buffer(response.data, 'base64');
			fs.writeFileSync('nuevoArchivo.xls', buff);
		})
		.catch((e) => {
			console.log(e);
		});
	res.send('Informacion Recibida y archivo excel creado');
});

router.get('/getUsers', (req, res) => {
	var url = `http://localhost:4000/getUsers`;
	axios({
		method: 'get',
		url,
	})
		.then((response) => {
			console.log(response.data);
		})
		.catch((e) => {
			console.log(e);
		});
	res.send('Informacion Recibida');
});
var city = [];

router.get('/getCity', (req, res) => {
	var url = `http://localhost:4000/getusers`;
	axios({
		method: 'get',
		url,
	})
		.then((response) => {
			var auxjson = response.data;
			axios({
				method: 'get',
				url: `http://localhost:6000/write`,
			})
				.then((response) => {})
				.catch((e) => {
					console.log(e);
				});
		})
		.catch((e) => {
			console.log(e);
		});
	res.send('Informacion Recibida');
});

router.get('/getCache', (req, res) => {
	var url = `http://localhost:6000/obtein`;
	axios({
		method: 'get',
		url,
	})
		.then((response) => {
			console.log(response.data);
		})
		.catch((e) => {
			console.log(e);
		});
	res.send('Informacion Recibida');
});

module.exports = router;
