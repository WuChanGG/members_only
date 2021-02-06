const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messages');

router.get('/createMessage', messageController.createMessageGet);

router.post('/createMessage', messageController.createMessagePost);

module.exports = router;