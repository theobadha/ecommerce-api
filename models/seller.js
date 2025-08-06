const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, minlength: 10, maxlength: 30 },
  phone: { type: Number, required: true, minlength: 10, maxlength: 15 },
  address: { type: String, required: true, minlength: 5, maxlength: 30 },
  password: { type: String, required: true },
});

const Seller = mongoose.model("Seller", sellerSchema);

exports.sellerSchema = sellerSchema;
exports.Seller = Seller;
