import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * Usage:
 * <Route path="/admin" element={<PrivateRoute adminOnly><AdminPage /></PrivateRoute>} />
 * <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
 */
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userInfo.role !== 'admin') {
    // Non-admin trying to access admin route
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
