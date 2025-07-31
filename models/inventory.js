const mongoose = require("mongoose");
const { sellerSchema } = require("./seller");

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true, minlength: 3, maxlength: 30 },
  itemDescription: { type: String, required: true, minlength: 5 },
  // look into how to upload and handle images on mongodb
  // image:,
  quantity: { type: Number, required: true, min: 0, max: 999 },
  category: { type: String, required: true, minlength: 5 },
  condition: { type: String, required: true, enum: ["new", "used", "for parts"] },
  price: { type: Number, required: true, min: 0 },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

exports.Inventory = Inventory;
