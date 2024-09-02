const axios = require('axios');

const API_KEY = 'w7I9Hcyh_Srz2dyenCBxCk6R9skoMXqJ4wRzWSwliu0';

const UNSPLASH_URL = 'https://api.unsplash.com';
const BASE_URL = `${UNSPLASH_URL}/search/photos`;

class ImagesModel {
	async getAll(params) {
		const url = new URL(BASE_URL);
		url.searchParams.append('client_id', API_KEY);

		const data = await axios.get(url.toString(), {
			params,
		});
		
		const results = data?.data?.results || [];

		const body = results.map((result) => {
			return {
				id: result.id,
				url: result.urls.regular,
				alt: result.alt_description,
			};
		});
		
		return body;
	}
}

module.exports = ImagesModel;