const mongoose = require("mongoose");

const MaterialEntrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    customerName: { type: String, required: true },
    companyName: { type: String, required: true },
    companyDetails: { type: String, required: true },
    productDetails: { type: String, required: true },
    quotation: { type: String, required: true },
    chalanNumber: { type: String, required: true },
    dispatchDetails: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    spare: { type: String },
    fault: { type: String },
    photo: { type: String },
  },
  { timestamps: true }
);

const MaterialEntry = mongoose.model("MaterialEntry", MaterialEntrySchema);

module.exports = MaterialEntry;
