// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const ProtectedRoutes = ({ element: Component }) => {
  const token = Cookies.get('authToken'); // Get the token from cookies

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  try {
    // Try to decode the token
    const decodedToken = jwtDecode(token);
    
    // Check if the token has expired (optional, depending on your JWT)
    if (decodedToken.exp * 1000 < Date.now()) {
      // Token has expired
      Cookies.remove('authToken'); // Remove the expired token
      return <Navigate to="/login" replace />;
    }

    // Token is valid, render the component
    return <Component />;
  } catch (error) {
    // If decoding the token fails, redirect to login
    console.error('Error decoding token:', error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
