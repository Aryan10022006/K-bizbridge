const express = require('express');
const { searchMerchants } = require('../controllers/searchController');
const router = express.Router();

router.get('/', searchMerchants);  // GET route for search functionality

module.exports = router;
