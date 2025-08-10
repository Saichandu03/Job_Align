const express = require('express');
const { chatbotHandler } = require('../controllers/chatbotController');
const router = express.Router();

// POST /api/chatbot
router.post('/chatbot', chatbotHandler);

module.exports = router;
