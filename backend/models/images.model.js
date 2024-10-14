const calculateLevenshteinDistance = require('../helpers/strings');
const Database = require('../helpers/database');
const Storage = require('../helpers/storage');
const AIAssistance = require('../helpers/ai-assistance');

const DB = new Database('images');
const storage = new Storage();
const ai = new AIAssistance();

class ImagesModel {
	async getAll(params) {
		const images = await DB.getAll();
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

			const distanceA = calculateLevenshteinDistance(search, termsA[0]);
			const distanceB = calculateLevenshteinDistance(search, termsB[0]);

			return distanceA - distanceB;
		});

		const body = results
			.map((result) => {
				return {
					id: result.id,
					url: result.url,
					alt: result.alt,
				};
			})
			.slice(0, 2);

		return body;
	}

	async add(data) {
		return new Promise(async (resolve) => {
			const {
				alt = '',
				searchTerms = '',
				filename = '',
				file = '',
			} = data;

			const searchTermsArray = searchTerms
				?.split(',')
				.map((term) => term.trim());
			const id = crypto.randomUUID();

			const url = await storage.upload(file, `images/${id}-${filename}`);

			const body = {
				alt,
				searchTerms: searchTermsArray,
				url,
				id,
			};

			const res = await DB.add(body);

			resolve(res);
		});
	}

	async generate(alt) {
		const response = await ai.getImageGeneration(alt);

		return response;
	}
}

module.exports = ImagesModel;
