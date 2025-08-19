import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Protected Route Component
 * 
 * This component wraps routes that require authentication.
 * It checks if the user is authenticated and redirects to login if not.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string} props.redirectTo - Path to redirect to if not authenticated (default: /login/buyer)
 * @param {string} props.userType - Type of user required (buyer/seller)
 */
const ProtectedRoute = ({ children, redirectTo = "/login/buyer", userType = "buyer" }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    // Save the attempted location to redirect back after login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If user type is specified, check if it matches
  if (userType && user && user.type !== userType) {
    // User is authenticated but wrong type, redirect to appropriate login
    const appropriateLogin = userType === "buyer" ? "/login/buyer" : "/login/seller";
    return <Navigate to={appropriateLogin} state={{ from: location }} replace />;
  }

  // User is authenticated and authorized, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;

