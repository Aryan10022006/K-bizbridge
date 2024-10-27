// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

// Middleware to check if the user is a customer
const isCustomer = (req, res, next) => {
    if (req.user.role !== 'customer') return res.status(403).json({ message: "Access denied. Customers only." });
    next();
};

// Middleware to check if the user is a merchant
const isMerchant = (req, res, next) => {
    if (req.user.role !== 'merchant') return res.status(403).json({ message: "Access denied. Merchants only." });
    next();
};

// Export the middleware functions
module.exports = {
    verifyToken,
    isCustomer,
    isMerchant,
};
