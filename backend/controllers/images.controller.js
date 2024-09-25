const ImagesModel = require('../models/images.model');
const imagesModel = new ImagesModel();

class ImagesController {
	async getAll(req, res) {
		const params = req.query;

		const message = await imagesModel.getAll(params);

		res.send(message);
	}

	async add(req, res) {
		const data = req.body;

		const response = await imagesModel.add(data);
		res.status(201).send(response);
	}
}

module.exports = ImagesController;
