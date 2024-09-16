const calculateLevenshteinDistance = require('../helpers/strings');
const Database = require('../helpers/database');
const DB = new Database('images');

class ImagesModel {
	async getAll(params) {
		const images = await DB.getAll();
		console.log(images);
		const { search } = params;

		const results = images.sort((a, b) => {
			const termsA = a.searchTerms;
			const termsB = b.searchTerms;

			termsA.sort((termA, termB) => {
				return (
					calculateLevenshteinDistance(search, termA) -
					calculateLevenshteinDistance(search, termB)
				);
			});
			termsB.sort((termA, termB) => {
				return (
					calculateLevenshteinDistance(search, termA) -
					calculateLevenshteinDistance(search, termB)
				);
			});

			console.log(termsA, termsB);

			const distanceA = calculateLevenshteinDistance(search, termsA[0]);
			const distanceB = calculateLevenshteinDistance(search, termsB[0]);

			console.log(distanceA, distanceB);

			return distanceA - distanceB;
		});

		console.log(results);

		const body = results
			.map((result) => {
				return {
					id: result.id,
					url: result.url,
					alt: result.alt,
				};
			})
			.slice(0, 1000);

		return body;
	}

	async add(data, file) {
		return new Promise(async (resolve, reject) => {
			const { alt, searchTerms } = data;
			const searchTermsArray = searchTerms
				.split(',')
				.map((term) => term.trim());
			const id = crypto.randomUUID();

			const body = {
				alt,
				searchTerms: searchTermsArray,
				url: `http://localhost:3000/images/${file.filename}`,
				id,
			};

			const res = await DB.add(body);

			resolve(res);
		});
	}
}

module.exports = ImagesModel;
