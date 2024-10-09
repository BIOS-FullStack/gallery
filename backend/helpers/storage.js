const admin = require('./firebase');

const storage = admin.storage();
const bucket = storage.bucket();

class Storage {
	async uploadBase64(base64, path) {
		const res = await bucket.file(path).save(base64, {
			public: true,
			metadata: {
				contentType: 'image/jpeg',
				contentEncoding: 'base64',
			},
		});
		return res;
	}
}

module.exports = Storage;
