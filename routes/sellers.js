const { Seller } = require("../models/seller");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const sellers = await Seller.find();
  res.send(sellers);
});

router.post("/", async (req, res) => {
  let seller = new Seller({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    password: req.body.password,
  });
  seller = await seller.save();

  res.send(seller);
});

router.put("/:id", async (req, res) => {
  const seller = await Seller.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
    },
    { new: true }
  );

  if (!seller)
    return res.status(400).send("Seller with given ID was not found");

  res.send(seller);
});

router.delete("/:id", async (req, res) => {
  const seller = await Seller.findByIdAndRemove(req.params.id);

  if (!seller) return res.status(400).send("Seller with given ID not found.");

  res.send(seller);
});

router.get("/:id", async (req, res) => {
  const seller = await Seller.findById(req.params.id);

  if (!seller) return res.status(404).send("Seller with given ID not found");

  res.send(seller);
});

module.exports = router;
