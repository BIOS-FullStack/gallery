const fs = require('fs');
const path = require('path');

const ImagesModel = require('../models/images.model');
const imagesModel = new ImagesModel();

class ImagesController {
	async getAll(req, res) {
		const params = req.query;

		const message = await imagesModel.getAll(params);

		res.send(message);
	}

	async add(req, res) {
		const data = req?.body || {};

		const { file = '', filename } = data;

		const exprecionRegular = /^data:(.+);base64,(.+)/;
		// exprecionRegular: Expresión regular para validar el formato de la imagen

		const coincidencias = file.match(exprecionRegular);
		// mathches: [
		// 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAABACAYAAAHQ8x0T...',
		// 'image/jpeg',
		// 'iVBORw0KGgoAAAANSUhEUgAAABQAAABACAYAAAHQ8x0T...'
		//]

		if (!coincidencias) {
			res.status(400).send('Invalid input string');
		}

		const buffer = Buffer.from(coincidencias[2], 'base64');
		// buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48...>

		const rutaDelArchivo = path.join(
			__dirname,
			'../public/images',
			filename,
		);

		// rutaDelArchivo: /Users/.../gallery-images/backend/public/images/image-test.jpg

		fs.writeFileSync(rutaDelArchivo, buffer);
		// image-test.jpg es creado en la carpeta public/images

		// continuar con el siguiente middleware

		const response = await imagesModel.add(data);
		res.status(201).send(response);
	}
}

module.exports = ImagesController;
