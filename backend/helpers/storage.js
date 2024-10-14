const { getDownloadURL } = require('firebase-admin/storage');
const admin = require('./firebase');

const storage = admin.storage();
const bucket = storage.bucket();

class Storage {
	async upload(file, path) {
		console.log('Vamos a subir un archivo...');

		const fileRef = bucket.file(path);

		await fileRef.save(file, {
			metadata: {
				contentType: 'image/png',
			},
		});

		const url = await getDownloadURL(fileRef);

		return url;
	}
}

module.exports = Storage;
