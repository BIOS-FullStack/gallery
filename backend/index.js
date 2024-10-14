require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const imagesRouter = require('./router/images.router');
const formidable = require('express-formidable');

const app = express();

app.use(formidable());
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
		const images = [{ searchTerms: ['dog', 'cat'] }];

		const terms = images.map((image) => image.searchTerms).flat();
		const uniqueTerms = [...new Set(terms)];
		const termsOrdered = uniqueTerms.sort();

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
