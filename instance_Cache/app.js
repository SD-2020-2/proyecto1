const express = require('express');
const server = express();
const port = 6000;
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
const plotly = require('plotly')('CrisxD1997', 'RIvohF6Y7HYBEojNS0rR');
const axios = require('axios');
const redis = require('redis');
const app = express();

const client = redis.createClient(6379);

client.on('error', (error) => {
	console.error(error);
});
var ciudades = [];
var numCiudades;
var ciudadesUnicas = [];
let prueba;
var info = [];

app.get('/write', (req, res) => {
	var url = `http://localhost:4000/getUsers`;
	client.flushdb(function (err, succeeded) {
		console.log(succeeded); // will be true if successfull
	});
	axios({
		method: 'get',
		url,
	}).then((response) => {
		var count = 0;
		response.data.forEach((e) => {
			ciudades[count] = e.CIUDAD;
			count++;
		});
		unicos = new Set(ciudades);
		//
		prueba = new Map();
		ciudades.forEach(function (i) {
			prueba[i] = (prueba[i] || 0) + 1;
		});
		ciudadesUnicas = Object.keys(prueba);
		info = Object.values(prueba);
		for (let item of unicos) {
			client.setex(item, 80000, prueba[item]);
		}
	});
	res.send('Informacion Recibida');
});

app.get('/obtein', (req, res) => {
	let vector = new Map();
	var aux = [];
	for (let i = 0; i < ciudadesUnicas.length; i++) {
		client.get(ciudadesUnicas[i], (err, recipe) => {
			vector.set(ciudadesUnicas[i], recipe);
		});
	}
	var x = 0;
	console.log('imprimexD');
	for (let i = 0; i < info.length; i++) {
		console.log(info[i]);
	}
	var data = [
		{
			x: ciudadesUnicas,
			y: info,
			type: 'bar',
		},
	];
	var graphOptions = { filename: 'basic-bar', fileopt: 'overwrite' };
	plotly.plot(data, graphOptions, function (err, msg) {
		console.log(msg);
		res.send(msg.url);
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
