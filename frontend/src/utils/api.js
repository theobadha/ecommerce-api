/**
 * API Utility Functions
 * 
 * This file contains helper functions for making authenticated API calls.
 * It automatically includes the JWT token from localStorage and handles
 * common authentication errors.
 */

/**
 * Makes an authenticated API call with automatic token handling
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise} - Fetch response promise
 */
export const authenticatedFetch = async (url, options = {}) => {
  // Get the authentication token from localStorage
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  // Set default headers and merge with provided options
  const defaultHeaders = {
    "x-auth-token": token, // Include JWT token for authentication
    "Content-Type": "application/json",
  };

  const fetchOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // Make the API call
  const response = await fetch(url, fetchOptions);

  // Handle authentication errors
  if (response.status === 401) {
    // Clear invalid token and redirect to login
    localStorage.removeItem("token");
    throw new Error("Authentication failed. Please log in again.");
  }

  // Handle other HTTP errors
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

/**
 * Makes a GET request to an authenticated endpoint
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Parsed JSON response
 */
export const authenticatedGet = async (url) => {
  const response = await authenticatedFetch(url);
  return response.json();
};

/**
 * Makes a POST request to an authenticated endpoint
 * @param {string} url - The API endpoint URL
 * @param {Object} data - Data to send in the request body
 * @returns {Promise} - Parsed JSON response
 */
export const authenticatedPost = async (url, data) => {
  const response = await authenticatedFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

/**
 * Makes a PUT request to an authenticated endpoint
 * @param {string} url - The API endpoint URL
 * @param {Object} data - Data to send in the request body
 * @returns {Promise} - Parsed JSON response
 */
export const authenticatedPut = async (url, data) => {
  const response = await authenticatedFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response.json();
};

/**
 * Makes a DELETE request to an authenticated endpoint
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Parsed JSON response
 */
export const authenticatedDelete = async (url) => {
  const response = await authenticatedFetch(url, {
    method: "DELETE",
  });
  return response.json();
};

