const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Customer = require('../models/Customer.js');
const Merchant = require('../models/Merchant.js');

// Signup function
const signup = async (req, res) => {
    try {
        const { role, username, email, phone, password } = req.body;

        // Check if email already exists
        const userExists = await (role === 'merchant' ? Merchant : Customer).findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already registered' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user based on role
        const newUser = role === 'merchant' 
            ? new Merchant({ username, email, phone, password: hashedPassword })
            : new Customer({ username, email, phone, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Find user by role
        const user = await (role === 'merchant' ? Merchant : Customer).findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { signup, login };
