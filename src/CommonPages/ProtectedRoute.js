// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    // Redirect to login if not an admin
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
