require("dotenv").config();
const mongoose = require("mongoose");

// Import route modules
const sellers = require("./routes/sellers");
const buyers = require("./routes/buyers");
const inventory = require("./routes/inventory");
const orders = require("./routes/orders");
const auth = require("./routes/auth");

// Import authentication middleware
const authMiddleware = require("./middleware/auth");

const express = require("express");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1/ecommerce")
  .then(() => console.log("Connected to MongoDb..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());

// Public routes (no authentication required)
app.use("/api/auth", auth);

// Protected routes (authentication required)
// These routes will require a valid JWT token in the x-auth-token header
app.use("/api/sellers", authMiddleware, sellers);    // All seller operations require auth
app.use("/api/buyers", authMiddleware, buyers);      // All buyer operations require auth
app.use("/api/inventory", authMiddleware, inventory); // All inventory operations require auth
app.use("/api/orders", authMiddleware, orders);      // All order operations require auth

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
