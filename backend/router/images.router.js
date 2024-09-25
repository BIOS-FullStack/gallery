const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const ImagesController = require('../controllers/images.controller.js');

const imagesController = new ImagesController();

router.get('/', imagesController.getAll);
router.post(
	'/',
	(req, res, next) => {
		const { file = '', filename } = req?.body;

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

		req.body.file = { filename };

		// continuar con el siguiente middleware
		next();
	},
	imagesController.add,
);

module.exports = router;
