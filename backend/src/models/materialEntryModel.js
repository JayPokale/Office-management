const mongoose = require("mongoose");

const MaterialEntrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    customerName: { type: String, required: true },
    productDetails: { type: String, required: true },
    quotation: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    spare: { type: String },
    chalanNumber: { type: String, required: true },
    dispatchDetails: { type: String, required: true },
    fault: { type: String },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

const MaterialEntry = mongoose.model("MaterialEntry", MaterialEntrySchema);

module.exports = MaterialEntry;
