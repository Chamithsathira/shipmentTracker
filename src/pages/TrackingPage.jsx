import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function TrackingPage() {
  const { token } = useAuth();
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");

  const trackShipment = async () => {
    if (!trackingId) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/track/${trackingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShipment(response.data);
      setError("");
    } catch (err) {
      setShipment(null);
      setError(err.response?.data?.error || "Error fetching shipment");
    }
  };

  return (
    <div className="container-fluid mt-5 px-4 d-flex justify-content-center">
      <div className="col-md-6 col-sm-10 mx-auto">
        <h2>Track Your Shipment</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={trackShipment}>
          Track
        </button>

        {error && <div className="alert alert-danger mt-2">{error}</div>}

        {shipment && (
          <div className="card mt-4 shadow">
            <div className="card-body">
              <h4>
                Status:{" "}
                <span
                  className={`badge ${
                    shipment.status === "Delivered"
                      ? "bg-success"
                      : "bg-warning"
                  }`}
                >
                  {shipment.status}
                </span>
              </h4>
              <p className="mt-2">
                <strong>Estimated Delivery:</strong>{" "}
                {new Date(shipment.estimatedDelivery).toLocaleDateString()}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(shipment.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
