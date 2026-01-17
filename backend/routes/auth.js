const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerUser, loginUser } = require('../controllers/authController');

// ADDED: Import for the PCOS Chatbot
const { getChatbotAiResponse } = require('../controllers/chatbotController');
const router = express.Router();

// Register a new user
router.post('/register', registerUser);
router.post('/login', loginUser);

// ADDED: Chatbot API Route
router.post('/pcos-chatbot', getChatbotAiResponse);

module.exports = router;