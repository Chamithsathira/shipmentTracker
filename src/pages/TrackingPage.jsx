import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function TrackingPage() {
    const { token } = useAuth();
    const [trackingId, setTrackingId] = useState('');
    const [shipment, setShipment] = useState(null);
    const [error, setError] = useState('');

    const trackShipment = async () => {
        if (!trackingId) return;

        try {
            const response = await axios.get(`http://localhost:5000/api/track/${trackingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShipment(response.data);
            setError('');
        } catch (err) {
            setShipment(null);
            setError(err.response?.data?.error || 'Error fetching shipment');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Track Your Shipment</h2>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Enter Tracking ID" 
                value={trackingId} 
                onChange={e => setTrackingId(e.target.value)} 
            />
            <button className="btn btn-primary mt-2" onClick={trackShipment}>Track</button>

            {error && <div className="alert alert-danger mt-2">{error}</div>}

            {shipment && (
                <div className="mt-4">
                    <h4>Status: {shipment.status}</h4>
                    <p>Estimated Delivery: {new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
                    <p>Last Updated: {new Date(shipment.lastUpdated).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}
