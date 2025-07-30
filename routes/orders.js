const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const { Buyer } = require("../models/buyer");
const { Seller } = require("../models/seller");
const { Inventory } = require("../models/inventory");

// Create a new order
router.post("/", async (req, res) => {
    const { itemName, qtyPurchase, buyerId } = req.body;

    // Validate buyer
    const buyer = await Buyer.findById(buyerId);
    if (!buyer) return res.status(400).send("Invalid buyer.");

    // Find inventory item
    const inventoryItem = await Inventory.findOne({ itemName });
    if (!inventoryItem) return res.status(400).send("Item not found in inventory.");

    // Check stock
    if (inventoryItem.quantity < qtyPurchase) {
        return res.status(400).send("Not enough stock.");
    }

    // // Find seller
    // const seller = await Seller.findById(inventoryItem.sellerId);
    // if (!seller) return res.status(400).send("Seller not found.");

    // Calculate price
    const price = inventoryItem.price * qtyPurchase;

    // Create order
    const order = new Order({
        itemName,
        qtyPurchase,
        buyerId,
        price,
        // Optionally, you can add sellerId, address, etc.
    });

    // Update inventory stock
  try {
      inventoryItem.quantity -= qtyPurchase;
      await inventoryItem.save();
  } catch (error) { 
    return res.status(500).send("Failed to update inventory: " + error.message);
  }

    await order.save();
    res.status(201).send(order);
});

// Get all orders
router.get("/", async (req, res) => {
    const orders = await Order.find().populate("buyerId", "name email");
    res.send(orders);
});

// Get order by ID
router.get("/:id", async (req, res) => {
    const order = await Order.findById(req.params.id).populate("buyerId", "name email");
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