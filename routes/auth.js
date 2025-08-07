require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Buyer } = require("../models/buyer");
const { Seller } = require("../models/seller");

// Register seller
router.post("/seller/register", async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  console.log("Registering seller with password:", password);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashedPassword);
  const seller = new Seller({
    name,
    email,
    phone,
    address,
    password: hashedPassword,
  });

  try {
    const savedSeller = await seller.save();
    res.status(201).send({
      message: "Seller registered successfully",
      sellerId: savedSeller._id,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login seller
router.post("/seller/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const seller = await Seller.findOne({ email });
  console.log("Seller found:", seller);
  if (!seller) return res.status(400).send("Invalid email or password");

  // Debugging: Log the stored password hash
  console.log("Stored hash:", seller.password);

  const isMatch = await bcrypt.compare(password, seller.password);
  console.log("Password match:", isMatch);
  if (!isMatch) return res.status(400).send("Invalid email or password");
  const token = jwt.sign(
    { id: seller._id, role: "seller" },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.send({ token, sellerId: seller._id });
});

// Register buyer
router.post("/buyer/register", async (req, res) => {
  const { name, email, phone, address, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const buyer = new Buyer({
    name,
    email,
    phone,
    address,
    password: hashedPassword,
  });

  try {
    const savedBuyer = await buyer.save();
    res.status(201).send({
      message: "Buyer registered successfully",
      buyerId: savedBuyer._id,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// Login buyer
router.post("/buyer/login", async (req, res) => {
  const { email, password } = req.body;
  const buyer = await Buyer.findOne({ email });
  if (!buyer) return res.status(400).send("Invalid email or password");
  const isMatch = await bcrypt.compare(password, buyer.password);
  if (!isMatch) return res.status(400).send("Invalid email or password");
  const token = jwt.sign({ id: buyer._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token, buyerId: buyer._id });
});
module.exports = router;
