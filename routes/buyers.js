const { Buyer } = require("../models/buyer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const buyers = await Buyer.find();
  res.send(buyers);
});

router.post("/", async (req, res) => {
  let buyer = new Buyer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    password: req.body.password,
  });
  buyer = await buyer.save();
  res.send(buyer);
});

router.put("/:id", async (req, res) => {
  const buyer = await Buyer.findByIdAndUpdate(
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

  if (!buyer) return res.status(400).send("Buyer with given ID not found");

  res.send(buyer);
});

router.delete("/:id", async (req, res) => {
  const buyer = await Buyer.findByIdAndRemove(req.params.id);

  if (!buyer) return res.status(400).send("Buyer with given ID not found");
  res.send(buyer);
});

router.get("/:id", async (req, res) => {
  const buyer = await Buyer.findById(req.params.id);

  if (!buyer) return res.status(404).send("Buyer with given ID not found");

  res.send(buyer);
});

module.exports = router;
