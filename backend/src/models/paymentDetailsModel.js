const mongoose = require("mongoose");

const PaymentDetailsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    customerName: { type: String, required: true },
    customerDetails: { type: String, required: true },
    billNo: { type: String, required: true },
    quotationDetails: { type: String, default: true },
    companyDetails: { type: String},
    companyName: { type: String },
    amountRemaining: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const PaymentDetails = mongoose.model("PaymentDetails", PaymentDetailsSchema);

module.exports = PaymentDetails;
