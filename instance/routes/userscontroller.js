const { createUser, refreshUsersList, getList } = require('../db/db');
var cloudinary = require('cloudinary');
var XLSX = require('xlsx');
var fs = require('fs');
var urlNew;

cloudinary.config({
	cloud_name: 'cristhian',
	api_key: '224758247675888',
	api_secret: 'Pmr8UTHjAWwJ9uOBUWjeHsepV34',
});

function base64_encode(file) {
	// read binary data
	var bitmap = fs.readFileSync(file);
	// convert binary data to base64 encoded string
	return new Buffer(bitmap).toString('base64');
}

const ExcelAJSON = (infoJson) => {
	let workBook = XLSX.utils.book_new();
	const workSheet = XLSX.utils.json_to_sheet(infoJson);
	XLSX.utils.book_append_sheet(workBook, workSheet, 'Hoja1');
	let exportFileName = 'archivo.xls';
	XLSX.writeFile(workBook, exportFileName);
};

const postUser = (req, res) => {
	var uploadStr = 'data:pruebaxD/jpeg;base64,' + req.body.FOTO;
	cloudinary.v2.uploader.upload(uploadStr, function (error, result) {
		req.body.FOTO = result.url;
		createUser(req.body);
	});
	logger.log('info', `Usuario Creado`);
	res.sendStatus(200);
};

const getExcel = (req, res) => {
	ExcelAJSON(getList());
	logger.log('info', `Archivo Excel Enviado`);
	res.send(base64_encode('./archivo.xls'));
};

const getUser = (req, res) => {
	let infoAUx = getList();
	console.log(req);
	console.log(Object.values(infoAUx));
	logger.log('info', `Lista obtenida`);
	res.send(Object.values(infoAUx));
};

module.exports = {
	postUser,
	getUser,
	getExcel,
};
