import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Route wrapper enforcing role segregation (student vs teacher).
 * Prevents students from accessing teacher routes and vice-versa.
 */
export function RoleRoute({ allowedRole, children }) {
  const { currentUser, role } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (role !== allowedRole) {
    // Redirect to the user's appropriate dashboard
    const destination = role === 'teacher' ? '/teacher' : '/student';
    return <Navigate to={destination} replace />;
  }

  return children;
}

export default RoleRoute;
