const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const ImagesController = require('../controllers/images.controller.js');

const imagesController = new ImagesController();

router.get('/', imagesController.getAll);
router.post('/', imagesController.add);

module.exports = router;
