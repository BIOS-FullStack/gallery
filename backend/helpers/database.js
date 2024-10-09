const admin = require('./firebase');

const db = admin.firestore();

class Database {
	constructor(collection) {
		this.collection = collection;
	}

	async getAll() {
		const data = (await db.collection(this.collection).get()).docs.map(
			(doc) => ({
				id: doc.id,
				...doc.data(),
			}),
		);

		return data;
	}

	async add(data) {
		await db.collection(this.collection).add(data);
		return data;
	}
}

module.exports = Database;
