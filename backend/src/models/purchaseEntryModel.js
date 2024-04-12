const mongoose = require("mongoose");

const PurchaseEntrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    customerName: { type: String, required: true },
    companyName: { type: String, required: true },
    companyDetails: { type: String, required: true },
    productDetails: { type: String, required: true },
    materialUsed: { type: String, required: true },
    chalanNumber: { type: String, required: true },
    cost: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    photo: { type: String },
  },
  { timestamps: true }
);

const PurchaseEntry = mongoose.model("PurchaseEntry", PurchaseEntrySchema);

module.exports = PurchaseEntry;
