const admin = require('./firebase');

const db = admin.firestore();

class Database {
	constructor(collection) {
		this.collection = collection;
	}

	async getAll({ params = [] } = {}) {
		let query = db.collection(this.collection);

		for (const param of params) {
			query = query.where(...param);
		}

		const data = (await query.get()).docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		return data;
	}

	async add(data) {
		await db.collection(this.collection).add(data);
		return data;
	}
}

module.exports = Database;
