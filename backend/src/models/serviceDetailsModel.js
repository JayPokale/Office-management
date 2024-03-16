const mongoose = require("mongoose");

const ServiceDetailsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    customerName: { type: String, required: true },
    customerDetails: { type: String, required: true },
    companyDetails: { type: String },
    companyName: { type: String },
    productDetails: { type: String, required: true },
    materialUsed: { type: String },
    quotation: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Delivered"],
      default: "Pending",
    },
    fault: { type: String },
  },
  { timestamps: true }
);

const ServiceDetails = mongoose.model("ServiceDetails", ServiceDetailsSchema);

module.exports = ServiceDetails;
