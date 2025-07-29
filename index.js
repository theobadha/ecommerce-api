const mongoose = require("mongoose");
const sellers = require("./routes/sellers");
const buyers = require("./routes/buyers");
const inventory = require("./routes/inventory");
const orders = require("./routes/orders")
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1/ecommerce")
  .then(() => console.log("Connected to MongoDb..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/sellers", sellers);
app.use("/api/buyers", buyers);
app.use("/api/inventory", inventory);
app.use("/api/orders", orders);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
