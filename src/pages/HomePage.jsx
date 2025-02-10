import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100 bg-light position-relative"
      style={{
        backgroundImage:
          "url('http://gcccargopvtltd.in/assets/web_assets/images/tracking-shipment.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container-fluid position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-0"
        style={{ pointerEvents: "none" }}
      ></div>{" "}
      {/* Overlay */}
      <div className="col-md-6 col-sm-10 mx-auto text-center p-4 rounded shadow-lg bg-white">
        <h1 className="fw-bold text-primary mb-3">
          🚛 Welcome to Shipment Tracker
        </h1>
        <p className="text-muted">
          Easily track your shipments and receive real-time updates on your
          deliveries.
        </p>
        <Link to="/track" className="btn btn-primary btn-lg shadow-sm mt-3">
          Track Your Shipment
        </Link>
      </div>
    </div>
  );
}
