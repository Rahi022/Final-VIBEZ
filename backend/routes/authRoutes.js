const express = require('express');
const { signup, signin } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/signup - Register a new user
router.post('/signup', signup);

// POST /api/auth/signin - Login an existing user
router.post('/signin', signin);

module.exports = router;
