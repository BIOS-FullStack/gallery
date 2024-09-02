const express = require('express');

const router = express.Router();
const ImagesController = require('../controllers/images.controller.js');

const imagesController = new ImagesController();

router.get('/', imagesController.getAll);

module.exports = router;