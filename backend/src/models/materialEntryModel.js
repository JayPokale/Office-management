const mongoose = require("mongoose");

const MaterialEntrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    customerName: { type: String, required: true },
    productDetails: { type: String, required: true },
    quotation: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    materialUsed: { type: String },
    chalanNumber: { type: String, required: true },
    dispatchDetails: { type: String, default: "" },
    fault: { type: String, default: "" },
    photo: { type: String },
  },
  { timestamps: true }
);

const MaterialEntry = mongoose.model("MaterialEntry", MaterialEntrySchema);

module.exports = MaterialEntry;
