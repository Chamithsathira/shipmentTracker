const express = require('express');
const Shipment = require('../models/Shipment');
const { sendEmail, sendWhatsAppMessage } = require('../utils/notificationService'); // Import notification functions
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Get Shipment by Tracking ID (Protected Route)
router.get('/:trackingId', authMiddleware, async (req, res) => {
    try {
        const shipment = await Shipment.findOne({ trackingId: req.params.trackingId });

        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }

        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving shipment' });
    }
});

// ✅ Update Shipment Status and Notify User
router.put('/:trackingId', authMiddleware, async (req, res) => {
    const { status, email, phone } = req.body;

    try {
        const shipment = await Shipment.findOne({ trackingId: req.params.trackingId });

        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }

        shipment.status = status;
        shipment.lastUpdated = new Date();
        await shipment.save();

        // ✅ Send notification
        const message = `Your shipment (${shipment.trackingId}) is now ${status}.`;
        if (email) await sendEmail(email, "Shipment Update", message);
        if (phone) await sendWhatsAppMessage(phone, message);

        res.json({ message: "Shipment updated and notification sent." });
    } catch (error) {
        res.status(500).json({ error: 'Error updating shipment' });
    }
});

module.exports = router;
