const Service = require('../models/Service');

// Add a new service
exports.addService = async (req, res) => {
    try {
        const { name, description, price, duration } = req.body;
        const service = new Service({
            name,
            description,
            price,
            duration,
            merchantId: req.user.id, // the logged-in merchant's ID
        });
        await service.save();
        res.status(201).json({ message: 'Service added successfully', service });
    } catch (error) {
        res.status(500).json({ message: 'Error adding service', error: error.message });
    }
};

// Get all services for a merchant
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find({ merchantId: req.user.id });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving services', error: error.message });
    }
};

// Update a service
exports.updateService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const { name, description, price, duration } = req.body;
        const service = await Service.findOneAndUpdate(
            { _id: serviceId, merchantId: req.user.id },
            { name, description, price, duration },
            { new: true }
        );
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json({ message: 'Service updated successfully', service });
    } catch (error) {
        res.status(500).json({ message: 'Error updating service', error: error.message });
    }
};

// Delete a service
exports.deleteService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const service = await Service.findOneAndDelete({ _id: serviceId, merchantId: req.user.id });
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
};
