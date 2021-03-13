const express = require('express');
const app = express();
const port = 4000;
const clientMongo = require('mongodb').MongoClient;
var url = 'mongodb://172.17.0.2:27017/';
var exec = require('child_process').exec;
// Nombre de bd
const dbName = 'names';
var array = [];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/users', (req, res) => {
	clientMongo.connect(url, { useUnifiedTopology: true }, function (err, db) {
		if (err) throw err;

		var dbo = db.db('names');
		const names = dbo.collection('info');
		// create a document to be inserted
		const doc = {
			ID: req.body.id,
			NOMBRE: req.body.name,
		};
		const result = names.insertOne(doc);
		console.log('fue agregado con exito el documento');
		res.sendStatus(200);
	});
});

// Conexión URL (estas corriendo en local :D)
clientMongo.connect(
	url,
	{
		useUnifiedTopology: true,
	},
	function (err, db) {
		if (err) throw err;
		var dbo = db.db('names');
		dbo
			.collection('info')
			.find({})
			.toArray(function (err, result) {
				if (err) throw err;
				console.log('lelnado db');
				console.log(result);
				array = result;
				db.close();
			});
	}
);

const refreshUsersList = async () => {
	await clientMongo.connect(
		url,
		{
			useUnifiedTopology: true,
		},
		function (err, db) {
			if (err) throw err;
			var dbo = db.db('names');
			dbo
				.collection('names')
				.find({})
				.toArray(function (err, result) {
					if (err) throw err;
					console.log('lelnado db');
					array = result;
					db.close();
				});
		}
	);
};

app.get('/', (req, res) => {
	res.send('Llego xD');
});

// Conectamos al servidor
app.get('/users', async (req, res) => {
	await refreshUsersList();

	res.send(array);
});

app.listen(port, () => {
	console.log(`App listening in the port: ${port}`);
});
