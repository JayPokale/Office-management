const mongoose = require("mongoose");

const PaymentEntrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    customerName: { type: String, required: true },
    companyName: { type: String, required: true },
    companyDetails: { type: String, required: true },
    billNo: { type: String, required: true },
    quotationDetails: { type: String, default: true },
    amountRemaining: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    photo: { type: String },
  },
  { timestamps: true }
);

const PaymentEntry = mongoose.model("PaymentEntry", PaymentEntrySchema);

module.exports = PaymentEntry;
