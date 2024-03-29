const mongoose = require("mongoose");

const PurchaseDetailsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    customerName: { type: String, required: true },
    companyDetails: { type: String },
    companyName: { type: String },
    productDetails: { type: String, required: true },
    materialUsed: { type: String, required: true },
    chalanNumber: { type: String, required: true },
    cost: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const PurchaseDetails = mongoose.model(
  "PurchaseDetails",
  PurchaseDetailsSchema
);

module.exports = PurchaseDetails;
