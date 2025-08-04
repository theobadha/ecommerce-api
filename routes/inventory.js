const { Seller } = require("../models/seller");
const { Inventory } = require("../models/inventory");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const { sellerId } = req.query;
  let filter = {};
  if (sellerId) {
    filter.seller = sellerId;
  }
  const inventory = await Inventory.find(filter);
  res.send(inventory);
});

router.post("/", async (req, res) => {
  const seller = await Seller.findById(req.body.sellerId);
  if (!seller) return res.status(400).send("Invalid seller for creation");

  let inventory = new Inventory({
    itemName: req.body.itemName,
    itemDescription: req.body.itemDescription,
    quantity: req.body.quantity,
    category: req.body.category,
    condition: req.body.condition,
    price: req.body.price,
    seller: seller._id,
  });

  inventory = await inventory.save();
  res.send(inventory);
});

router.put("/:id", async (req, res) => {
  const seller = await Seller.findById(req.body.sellerId);
  if (!seller) return res.status(400).send("Invalid seller for edit");

  const inventory = await Inventory.findByIdAndUpdate(
    req.params.id,
    {
      itemName: req.body.itemName,
      itemDescription: req.body.itemDescription,
      quantity: req.body.quantity,
      category: req.body.category,
      condition: req.body.condition,
      price: req.body.price,
      seller: { _id: seller._id, name: seller.name },
    },
    { new: true }
  );

  if (!inventory) return res.status(404).send("Inventory item not found");
  res.send(inventory);
});

router.delete("/", async (req, res) => {
  const inventory = await Inventory.findByIdAndDelete(req.params.id);

  if (!inventory) return res.status(404).send("inventory item not found");
  res.send(inventory);
});

router.get("/:id", async (req, res) => {
  const inventory = await Inventory.findById(req.params.id);
  if (!inventory) return res.status(404).send("inventory item not found");

  res.send(inventory);
});
module.exports = router;
