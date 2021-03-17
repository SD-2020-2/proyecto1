const { Router } = require('express');
const express = require('express');
const axios = require('axios');
var XLSX = require('xlsx');
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
			//obtener la url de la imagen que es, no de la que esta por defecto
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

const ExcelAJSON = () => {
	const excel = XLSX.readFile('./routes/sample.xlsx');
	var nombreHoja = excel.SheetNames; // regresa un array
	let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
	let workbook = XLSX.utils.book_append_sheet;
	console.log(nombreHoja[0]);
	const jDatos = [];
	for (let i = 0; i < 3; i++) {
		const dato = datos[i];
		jDatos.push({
			ID: '13123',
			NOMBRE: 'cristhian',
		});
	}
	//workbook.
	XLSX.write(workbook, jDatos);
	console.log(jDatos);
};

router.get('/excel', (req, res) => {
	ExcelAJSON();
	res.send('<h1>Archivo excel creado!</h1>');
});

router.get('/getUsers', (req, res) => {
	var url = `http://localhost:4000/getusers`;
	axios({
		method: 'get',
		url,
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

module.exports = router;
