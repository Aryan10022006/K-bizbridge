const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');
const authMiddleware = require('../middleware/authMiddleware');

// Ensure the user is a merchant
const { verifyToken, isMerchant } = authMiddleware;

router.post('/', verifyToken, isMerchant, ServiceController.addService);
router.get('/', verifyToken, isMerchant, ServiceController.getServices);
router.put('/:serviceId', verifyToken, isMerchant, ServiceController.updateService);
router.delete('/:serviceId', verifyToken, isMerchant, ServiceController.deleteService);

module.exports = router;
