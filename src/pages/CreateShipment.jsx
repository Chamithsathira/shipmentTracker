import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateShipment() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const createShipment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/admin/shipments",
        {
          trackingId,
          status,
          estimatedDelivery,
          email,
          phone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/admin"); // Redirect to Admin Dashboard
    } catch (err) {
      setError("Error creating shipment");
    }
  };

  return (
    <div className="container-fluid mt-5 px-4">
      <div className="col-md-6 col-sm-10 mx-auto">
        <h2>Create Shipment</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={createShipment}>
          <div className="mb-3">
            <label className="form-label">Tracking ID</label>
            <input
              type="text"
              className="form-control w-100"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <input
              type="text"
              className="form-control w-100"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Estimated Delivery</label>
            <input
              type="date"
              className="form-control w-100"
              value={estimatedDelivery}
              onChange={(e) => setEstimatedDelivery(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Recipient Email</label>
            <input
              type="email"
              className="form-control w-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Recipient Phone</label>
            <input
              type="tel"
              className="form-control w-100"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Shipment
          </button>
        </form>
      </div>
    </div>
  );
}
