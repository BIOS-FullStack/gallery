const express = require('express');
const cors = require('cors');

const imagesRouter = require('./router/images.router');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('Hello World');
});


app.use('/api/images', imagesRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});