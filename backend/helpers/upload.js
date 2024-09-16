const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},
	filename: (req, file, cb) => {
		const filename = file.originalname;
		const newFileName = `${Date.now()}-${Math.random() * 10e9}-${filename}`;

		cb(null, newFileName);
	},
});

const upload = multer({
	storage,
	limits: { fieldSize: 1024 * 1024 * 5 }, // 5MB
	fileFilter: (req, file, cb) => {
		const isImage =
			file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg';

		cb(null, isImage);
	},
});

module.exports = upload;
