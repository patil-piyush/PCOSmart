// const express = require('express');
// const { registerUser, loginUser } = require('../controllers/authController');

// const router = express.Router();

// // Register a new user
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// module.exports = router;

const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
// 1. Import Chatbot Controller
const { getChatbotAiResponse } = require('../controllers/chatbotController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// 2. Add Chatbot Route HERE (Matches frontend /api/auth/pcos-chatbot)
router.post('/pcos-chatbot', getChatbotAiResponse);

module.exports = router;