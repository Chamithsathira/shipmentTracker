const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
    trackingId: { type: String, required: true, unique: true },
    status: { type: String, required: true, enum: ['In Transit', 'Delivered', 'Pending'] },
    estimatedDelivery: { type: Date, required: true },
    lastUpdated: { type: Date, default: Date.now },
    email: { type: String, required: false }, 
    phone: { type: String, required: false }
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
