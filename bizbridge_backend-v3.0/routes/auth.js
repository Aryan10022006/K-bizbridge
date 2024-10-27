// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Customer = require('../models/Customer');
const Merchant = require('../models/Merchant');

// Signup route
router.post('/signup', async (req, res) => {
    const { role, username, email, phone, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = role === 'customer' ? await Customer.findOne({ email }) : await Merchant.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user based on role
        let newUser;
        if (role === 'customer') {
            newUser = new Customer({ username, email, phone, password: hashedPassword });
        } else if (role === 'merchant') {
            newUser = new Merchant({ username, email, phone, password: hashedPassword });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Signup successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Find user by role
        const user = role === 'customer' ? await Customer.findOne({ email }) : await Merchant.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
