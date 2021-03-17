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
		var dbo = db.db('users');
		const names = dbo.collection('users');
		// create a document to be inserted
		const doc = {
			CEDULA: users.CEDULA,
			NOMBRE: users.NOMBRE,
			CIUDAD: users.CIUDAD,
			FOTO: users.FOTO,
		};
		const result = names.insertOne(doc);
		console.log('fue agregado con exito el documento');
	});
}
// Conexión URL (estas corriendo en local :D)
/*clientMongo.connect(
	url,
	{
		useUnifiedTopology: true,
	},
	function (err, db) {
		if (err) throw err;
		var dbo = db.db('users');
		dbo
			.collection('users')
			.find({})
			.toArray(function (err, result) {
				if (err) throw err;
				console.log('Conexion a BD exitosa');
				//console.log(result);
			});
	}
);*/

/*app.get('/', (req, res) => {
	res.send('Llego xD');
});

app.get('/users', async (req, res) => {
	await refreshUsersList();
	res.send(array);
});*/

module.exports = {
	createUser,
	//refreshUsersList,
	getList,
};
