const { Router } = require('express');
const express = require('express');
const axios = require('axios');
var fs = require('fs');
const router = Router();
router.use(express.json());
var cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: 'cristhian',
	api_key: '224758247675888',
	api_secret: 'Pmr8UTHjAWwJ9uOBUWjeHsepV34',
});

var urlimage;

function uploadImageServer() {
	cloudinary.uploader.upload('./public/img.jpg', function (error, result) {
		console.log(error.url);
	});
}

router.get('/agregar', (req, res) => {
	uploadImageServer();
	var url = `http://localhost:4000/agregar`;
	axios({
		method: 'post',
		url,
		data: {
			CEDULA: '345546456',
			NOMBRE: 'Andrea Echeverry',
			CIUDAD: 'Cali',
			FOTO: cloudinary.url('img.jpg'),
		},
	})
		.then((response) => {
			console.log(response.data);
		})
		.catch((e) => {
			console.log(e);
			// Capturamos los errores
		});
	res.send('llego');
});

router.get('/', (req, res) => {
	res.send(`Middleware router working on`);
});

module.exports = router;
