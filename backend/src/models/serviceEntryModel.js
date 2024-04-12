const mongoose = require("mongoose");

const ServiceEntrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    customerName: { type: String, required: true },
    companyName: { type: String },
    companyDetails: { type: String },
    productDetails: { type: String, required: true },
    materialUsed: { type: String },
    quotation: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Delivered"],
      default: "Pending",
    },
    fault: { type: String },
    photo: { type: String },
  },
  { timestamps: true }
);

const ServiceEntry = mongoose.model("ServiceEntry", ServiceEntrySchema);

module.exports = ServiceEntry;
