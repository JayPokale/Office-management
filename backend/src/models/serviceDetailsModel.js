const { z } = require("zod");
const mongoose = require("mongoose");

const ServiceDetailsSchema = z.object({
  userId: z.string(),
  date: z.date(),
  customerName: z.string(),
  customerDetails: z.string(),
  productDetails: z.string(),
  fault: z.string().default(""),
  materialUsed: z.string(),
  quotation: z.string().nullable(),
  status: z.enum(["Pending", "Shipped", "Delivered"]).default("Pending"),
});

const serviceDetailsSchema = new mongoose.Schema(ServiceDetailsSchema.shape, {
  timestamps: true,
});

const ServiceDetails = mongoose.model("ServiceDetails", serviceDetailsSchema);

module.exports = ServiceDetails;
module.exports.ServiceDetailsSchema = ServiceDetailsSchema;
