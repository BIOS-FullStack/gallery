const ImagesModel = require('../models/images.model');
const imagesModel = new ImagesModel();

class ImagesController {
	async getAll(req, res) {
		const params = req.query;

		const message = await imagesModel.getAll(params);
		res.send(message);
	}
}

module.exports = ImagesController;
