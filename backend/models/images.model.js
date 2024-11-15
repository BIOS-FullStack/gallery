const calculateLevenshteinDistance = require('../helpers/strings');
const Database = require('../helpers/database');
const Storage = require('../helpers/storage');
const AIAssistance = require('../helpers/ai-assistance');

const DB = new Database('images');
const storage = new Storage();
const ai = new AIAssistance();

const admin = require('../helpers/firebase');
const db = admin.firestore();

class ImagesModel {
	async getAll(data) {
		const { search, userId } = data;
		const params = [];

		if (userId) {
			params.push(['userId', '==', userId]);
		}

		if (search) {
			params.push(['searchTerms', 'array-contains', search]);
		}

		const images = await DB.getAll({ params });
		const usersId = new Set(
			images.map((image) => image.userId).filter(Boolean),
		);
		const usersPromises = [...usersId].map((userId) =>
			db.collection('users').doc(userId).get(),
		);
		const users = await Promise.all(usersPromises);

		const usersDictionary = new Map();

		users.forEach((user) => {
			usersDictionary.set(user.id, user.data());
		});

		const body = images.map(async (result) => {
			const user = usersDictionary.get(result.userId);

			return {
				id: result.id,
				url: result.url,
				alt: result.alt,
				userId: result.userId || null,
				userName: user?.name || null,
				userRole: user?.role || null,
			};
		});

		return Promise.all(body);
	}

	async add(data) {
		return new Promise(async (resolve) => {
			const {
				alt = '',
				searchTerms = '',
				filename = '',
				file = '',
				userId,
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
				userId,
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
