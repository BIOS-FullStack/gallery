const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const calculateLevenshteinDistance = require('./helpers/strings');
const Database = require('./helpers/database');
const DB = new Database('images');

require('dotenv').config();

const imagesRouter = require('./router/images.router');

const app = express();

app.use(cors());

const server = createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	socket.on('inputChange', async (search) => {
		const images = await DB.getAll();

		const terms = images.map((image) => image.searchTerms).flat();
		const uniqueTerms = [...new Set(terms)];
		const termsOrdered = uniqueTerms.sort((termA, termB) => {
			return (
				calculateLevenshteinDistance(search, termA) -
				calculateLevenshteinDistance(search, termB)
			);
		});

		const words = termsOrdered.slice(0, 5);

		socket.emit('autocompleteOptions', words);
	});
});

app.use(express.json({ limit: '50mb' }));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/api/images', imagesRouter);

server.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});
