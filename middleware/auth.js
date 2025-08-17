const jwt = require("jsonwebtoken");

/**
 * Authentication Middleware
 * 
 * This middleware verifies JWT tokens for protected routes.
 * It extracts the token from the 'x-auth-token' header,
 * verifies it using the JWT_SECRET, and attaches the decoded
 * user information to the request object.
 * 
 * Usage: Add this middleware to any route that requires authentication
 * Example: app.use('/protected-route', auth, routeHandler)
 */
function auth(req, res, next) {
  // Extract the JWT token from the request header
  // The frontend should send the token in the 'x-auth-token' header
  const token = req.header("x-auth-token");
  
  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({
      error: "Access denied. No token provided.",
      message: "Please login"
    });
  }

  try {
    // Verify the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user information to the request object
    // This allows route handlers to access user data via req.user
    req.user = decoded;
    
    // Continue to the next middleware or route handler
    next();
  } catch (ex) {
    // If token verification fails (expired, invalid, etc.), deny access
    return res.status(401).json({
      error: "Invalid token.",
      message: "Your authentication token is invalid or expired. Please log in again."
    });
  }
}

module.exports = auth;
