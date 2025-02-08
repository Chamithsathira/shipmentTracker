import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Wrap the app with AuthProvider
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrackingPage from './pages/TrackingPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import CreateShipment from './pages/CreateShipment';
import EditShipment from './pages/EditShipment';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/track" element={
            <PrivateRoute>
              <TrackingPage />
            </PrivateRoute>
          } />
          <Route path="/admin/create-shipment" element={<CreateShipment />} />
          <Route path="/admin/edit-shipment/:trackingId" element={<EditShipment />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
