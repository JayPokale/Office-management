const mongoose = require("mongoose");

const ServiceDetailsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    customerName: { type: String, required: true },
    customerDetails: { type: String, required: true },
    productDetails: { type: String, required: true },
    fault: { type: String, default: "" },
    materialUsed: { type: String, required: true },
    quotation: { type: String, default: null },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const ServiceDetails = mongoose.model("ServiceDetails", ServiceDetailsSchema);

module.exports = ServiceDetails;
