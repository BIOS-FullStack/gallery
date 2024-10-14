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
		const filePath = req.files.file.path;
		console.log(req?.files?.file);
		const file = fs.readFileSync(filePath);
		fs.writeFileSync(
			path.join(__dirname, '..', 'public', 'images', 'prueba.png'),
			file,
		);

		const data = { ...req.fields, file };

		console.log(data);

		const response = await imagesModel.add(data);
		res.status(201).send(response);
	}

	async generate(req, res) {
		const alt = req.query.alt;

		const response = await imagesModel.generate(alt);

		res.status(200).send(response);
	}
}

module.exports = ImagesController;
