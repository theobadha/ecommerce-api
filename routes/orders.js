const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const { Buyer } = require("../models/buyer");
const { Seller } = require("../models/seller");
const { Inventory } = require("../models/inventory");

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { itemName, qtyPurchase, buyerId, sellerId } = req.body;

    console.log("Creating order with data:", req.body);

    // Validate buyer
    const buyer = await Buyer.findById(buyerId);
    if (!buyer) return res.status(400).send("Invalid buyer.");

    // Find inventory item
    const inventoryItem = await Inventory.findOne({ itemName });
    if (!inventoryItem)
      return res.status(400).send("Item not found in inventory.");

    // Check stock
    if (inventoryItem.quantity < qtyPurchase) {
      return res.status(400).send("Not enough stock.");
    }

    // Calculate price
    const price = inventoryItem.price;

    // Create order
    const order = new Order({
      itemName,
      qtyPurchase,
      buyerId,
      sellerId: sellerId || inventoryItem.seller, // Use provided sellerId or fallback to inventory seller
      price,
    });

    // Update inventory stock
    inventoryItem.quantity -= qtyPurchase;
    await inventoryItem.save();

    await order.save();
    console.log("Order created successfully:", order);
    res.status(201).send(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Failed to create order: " + error.message);
  }
});

// Get all orders by all buyers
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

// Get all orders for a specific buyer
router.get("/buyer/:buyerId", async (req, res) => {
  try {
    console.log("Fetching orders for buyer:", req.params.buyerId);
    const orders = await Order.find({ buyerId: req.params.buyerId });
    console.log("Found orders:", orders);
    res.send(orders);
  } catch (error) {
    console.error("Error fetching buyer orders:", error);
    res.status(500).send("Failed to fetch orders: " + error.message);
  }
});

// Get order by ID
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "buyerId",
    "name email"
  );
  if (!order) return res.status(404).send("Order not found.");
  res.send(order);
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).send("Order not found.");

  // Optionally, restore inventory quantity
  const inventoryItem = await Inventory.findOne({ itemName: order.itemName });
  if (inventoryItem) {
    inventoryItem.quantity += order.qtyPurchase;
    await inventoryItem.save();
  }

  res.send({ message: "Order deleted.", order });
});

module.exports = router;
