const requireAuth = (req, res, next) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }

  // If not authenticated, return an error response
  res.status(401).json({ error: "Unauthorized access. Please log in." });
};

module.exports = requireAuth;
