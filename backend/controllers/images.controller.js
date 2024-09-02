const ImagesModel = require('../models/images.model');
const imagesModel = new ImagesModel();

class ImagesController {
	async getAll(req, res) {
		const params = req.query;
		if (!params.search) {
			res.status(400).send({
				message: 'Query parameter is required',
			});
			return;
		}

		params.query = params.search;

		const message = await imagesModel.getAll(params);
		res.send(message);
	}
}

module.exports = ImagesController;