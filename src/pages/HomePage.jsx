import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light"
    style={{
      backgroundImage: "url('http://gcccargopvtltd.in/assets/web_assets/images/tracking-shipment.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center"
  }}
  >
    <h1 className="fw-bold text-dark mb-4">🚛 Welcome to Shipment Tracker</h1>
    <p className="text-muted text-center w-50">
        Easily track your shipments and receive real-time updates on your deliveries.
    </p>
    <Link to="/track" className="btn btn-primary btn-lg shadow-sm mt-3">
        Track Your Shipment
    </Link>
</div>
  );
}
