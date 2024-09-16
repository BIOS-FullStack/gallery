const path = require('path');
const fs = require('fs');

class Database {
	constructor(name) {
		this._fileName = path.resolve(__dirname, `../data/${name}.json`);
	}

	async _readFile() {
		return new Promise((resolve, reject) => {
			fs.readFile(this._fileName, 'utf8', (err, data) => {
				if (err) {
					reject(err);
				}
				const body = JSON.parse(data);
				resolve(body);
			});
		});
	}

	async _writeFile(data) {
		return new Promise((resolve, reject) => {
			const raw = JSON.stringify(data);
			fs.writeFile(this._fileName, raw, 'utf8', (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}

	async getAll() {
		const data = await this._readFile();
		return data;
	}

	async add(data) {
		const currentData = await this._readFile();
		const newData = [...currentData, data];
		await this._writeFile(newData);
		return data;
	}
}

module.exports = Database;
