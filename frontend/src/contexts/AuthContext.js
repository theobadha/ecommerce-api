import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * Authentication Context
 * 
 * This context provides authentication state and methods throughout the application.
 * It manages the JWT token, user information, and authentication status.
 */

const AuthContext = createContext();

/**
 * Custom hook to use the authentication context
 * @returns {Object} Authentication context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Authentication Provider Component
 * 
 * This component wraps the application and provides authentication state
 * to all child components.
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on component mount
    checkAuthStatus();
  }, []);

  /**
   * Check if the user is currently authenticated
   * by verifying the JWT token in localStorage
   */
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const buyerId = localStorage.getItem("buyerId");
    
    if (token && buyerId) {
      // Token exists, set as authenticated
      setIsAuthenticated(true);
      setUser({ id: buyerId, type: "buyer" });
    } else {
      // No token, user is not authenticated
      setIsAuthenticated(false);
      setUser(null);
    }
    
    setLoading(false);
  };

  /**
   * Login the user and store authentication data
   * @param {string} token - JWT token from server
   * @param {string} userId - User ID from server
   * @param {string} userType - Type of user (buyer/seller)
   */
  const login = (token, userId, userType) => {
    localStorage.setItem("token", token);
    localStorage.setItem("buyerId", userId);
    setIsAuthenticated(true);
    setUser({ id: userId, type: userType });
  };

  /**
   * Logout the user and clear authentication data
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("buyerId");
    setIsAuthenticated(false);
    setUser(null);
  };

  /**
   * Check if the user has a valid authentication token
   * @returns {boolean} True if user is authenticated
   */
  const hasValidToken = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    hasValidToken,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

