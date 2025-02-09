import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🚛 Shipment Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          {user ? (
            <>
              <span className="text-light me-3 fw-semibold">
                Welcome, {user.email}
              </span>
              <button className="btn btn-outline-light" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-primary me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-success" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
