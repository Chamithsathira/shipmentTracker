import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState("");

  // Fetch all shipments for admin
  const fetchShipments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/shipments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShipments(response.data);
    } catch (err) {
      setError("Error fetching shipments");
    }
  };

  // Handle delete shipment
  const deleteShipment = async (trackingId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/shipments/${trackingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchShipments(); // Refresh the list
    } catch (err) {
      setError("Error deleting shipment");
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div className="container-fluid mt-5 px-4">
      <div className="col-md-6 col-sm-10 mx-auto">
        <h2 className="mb-4">Admin Dashboard</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-flex justify-content-between mb-3">
          <h4>Shipments</h4>
          <button
            className="btn btn-success"
            onClick={() => navigate("/admin/create-shipment")}
          >
            Create New Shipment
          </button>
        </div>
        {shipments.length === 0 ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Loading shipments...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Tracking ID</th>
                  <th>Status</th>
                  <th>Estimated Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.trackingId}>
                    <td>{shipment.trackingId}</td>
                    <td>
                      <span className="badge bg-info">{shipment.status}</span>
                    </td>
                    <td>
                      {new Date(
                        shipment.estimatedDelivery
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() =>
                          navigate(
                            `/admin/edit-shipment/${shipment.trackingId}`
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteShipment(shipment.trackingId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
