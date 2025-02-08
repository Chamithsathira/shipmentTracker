import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">Shipment Tracker</Link>
                <div className="ms-auto d-flex align-items-center">
                    {user ? (
                        <>
                            <span className="text-light me-3">Welcome, {user.email}</span>
                            <button className="btn btn-danger" onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                        <Link className="btn btn-primary" to="/login">Login</Link>
                        <Link className="btn btn-success" to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
