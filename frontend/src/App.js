// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Cart from './pages/cart';
import Orders from './pages/orders';
import ProtectedRoute from './components/protectedRoutes'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route path="/cart" element={<ProtectedRoute element={Cart} />} />
        <Route path="/orders" element={<ProtectedRoute element={Orders} />} />
      </Routes>
    </Router>
  );
};

export default App;
