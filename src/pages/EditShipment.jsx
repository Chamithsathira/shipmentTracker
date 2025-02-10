import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditShipment() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { trackingId } = useParams(); // Get tracking ID from URL
  const [status, setStatus] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch existing shipment details
    const fetchShipment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/track/${trackingId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStatus(response.data.status);
        setEstimatedDelivery(response.data.estimatedDelivery.split("T")[0]);
      } catch (err) {
        setError("Error fetching shipment details");
      }
    };
    fetchShipment();
  }, [trackingId, token]);

  const updateShipment = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/shipments/${trackingId}`,
        {
          status,
          estimatedDelivery,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/admin"); // Redirect to Admin Dashboard
    } catch (err) {
      setError("Error updating shipment");
    }
  };

  return (
    <div className="container-fluid mt-5 px-4">
      <div className="col-md-6 col-sm-10 mx-auto">
        <h2>Edit Shipment</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={updateShipment}>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <input
              type="text"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Estimated Delivery</label>
            <input
              type="date"
              className="form-control"
              value={estimatedDelivery}
              onChange={(e) => setEstimatedDelivery(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Shipment
          </button>
        </form>
      </div>
    </div>
  );
}
