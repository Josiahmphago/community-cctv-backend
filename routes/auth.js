const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this model exists
const router = express.Router();

// Test route for `/auth`
router.get('/', (req, res) => {
    res.send('Auth endpoint working');
});

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
