const express = require('express');
const controller = require('../controllers/shortenerController');
const router = express.Router();

router.post('/shorturls', controller.createShortUrl);
router.get('/shorturls/:shortcode', controller.getUrlStats);

module.exports = router;