const clientMongo = require('mongodb').MongoClient;
var url = 'mongodb://172.17.0.2:27017/';
// Nombre de bd
const dbName = 'names';
var array = [];

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

function createUser(users) {
	clientMongo.connect(url, { useUnifiedTopology: true }, function (err, db) {
		if (err) throw err;
		var dbo = db.db('names');
		const names = dbo.collection('info');
		// create a document to be inserted
		const doc = {
			ID: users.ID,
			NOMBRE: users.NOMBRE,
		};
		const result = names.insertOne(doc);
		console.log('fue agregado con exito el documento');
	});
}
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

/*app.get('/', (req, res) => {
	res.send('Llego xD');
});

app.get('/users', async (req, res) => {
	await refreshUsersList();
	res.send(array);
});*/

module.exports = {
	createUser,
	refreshUsersList,
};
