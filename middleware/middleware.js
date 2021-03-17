const express = require('express');
const morgan = require('morgan');

const server = express();
const port = 2000;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(morgan('common'));
server.use(require('./routes/index.routes'));

const axios = require('axios');
const redis = require('redis');
const app = express();

const client = redis.createClient(6379);

client.on('error', (error) => {
	console.error(error);
});

app.get('/', (req, res) => {
	res.send('estoy listo pa escuchar');
});

app.get('/recipe/:fooditem', (req, res) => {
	try {
		const foodItem = req.params.fooditem;

		// Primero, consulte la tienda de redis para obtener los datos
		client.get(foodItem, async (err, recipe) => {
			if (recipe) {
				return res.status(200).send({
					error: false,
					message: `Receta para ${foodItem} de la memoria cache`,
					data: JSON.parse(recipe),
				});
			} else {
				//Cuando los datos no se encuentran en la caché, podemos realizar una solicitud al servidor.

				const recipe = await axios.get(`http://www.recipepuppy.com/api/?q=${foodItem}`);

				// guardar el registro en la caché para su posterior solicitud
				client.setex(foodItem, 1440, JSON.stringify(recipe.data.results));

				// retorna el resultado al cliente
				return res.status(200).send({
					error: false,
					message: 'Receta para ${foodItem} de la memoria cache',
					data: recipe.data.results,
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

/*server.listen(port, () => {
	console.log(`Middleware listening on port ${port}`);
});*/

//backUpdatabase();
//restoreDB();

//hacer la busqueda por ciudad
//enviar esos datos a la cache
//hacer la consulta postman
