const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const Shipment = require('../models/Shipment');
const { sendEmail, sendWhatsAppMessage } = require('../utils/notificationService');

const router = express.Router();

// ✅ Only admins can access these routes
router.get('/shipments', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const shipments = await Shipment.find();
        res.json(shipments);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving shipments' });
    }
});

router.post('/shipments', authMiddleware, adminMiddleware, async (req, res) => {
    const { trackingId, status, estimatedDelivery, email, phone } = req.body;

    try {
        const newShipment = new Shipment({
            trackingId,
            status,
            estimatedDelivery,
            email,
            phone
        });
        await newShipment.save();
        res.status(201).json({ message: 'Shipment created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating shipment' });
    }
});

router.put('/shipments/:trackingId', authMiddleware, adminMiddleware, async (req, res) => {
    const { status, email, phone } = req.body;

    try {
        const shipment = await Shipment.findOne({ trackingId: req.params.trackingId });
        if (!shipment) return res.status(404).json({ error: 'Shipment not found' });

        shipment.status = status;
        shipment.lastUpdated = new Date();
        await shipment.save();

        const email = shipment.email;
        const phone = shipment.phone;
        const message = `Your shipment (${shipment.trackingId}) is now ${status}.`;

        if (email) await sendEmail(email, "Shipment Update", message);
        if (phone) await sendWhatsAppMessage(phone, message);

        res.json({ message: 'Shipment status updated and notification sent.' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating shipment' });
    }
});

router.delete('/shipments/:trackingId', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const shipment = await Shipment.findOneAndDelete({ trackingId: req.params.trackingId });
        if (!shipment) return res.status(404).json({ error: 'Shipment not found' });

        res.json({ message: 'Shipment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting shipment' });
    }
});

module.exports = router;
