const express = require('express');

const upload = require('../helpers/upload.js');

const router = express.Router();
const ImagesController = require('../controllers/images.controller.js');

const imagesController = new ImagesController();

router.get('/', imagesController.getAll);
router.post('/', upload.single('file'), imagesController.add);

module.exports = router;
