const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    itemName: {type:String, required: true, minlength: 3, maxlength: 30},
    qtyPurchase: {type:Number, required: true, min: 1},
    buyerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true},
    sellerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Seller'},
    price: {type:Number, required: true, min: 0},
    createdAt: {type: Date, default: Date.now}
});

const Order = mongoose.model("Order", orderSchema);

exports.orderSchema = orderSchema;
exports.Order = Order;
