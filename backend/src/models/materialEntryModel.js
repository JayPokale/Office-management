const { z } = require("zod");
const mongoose = require("mongoose");

const MaterialEntrySchema = z.object({
  userId: z.string(),
  date: z.date(),
  customerName: z.string(),
  productDetails: z.string(),
  quotation: z.string().optional(),
  status: z.enum(["Pending", "Shipped", "Delivered"]).default("Pending"),
  chalanNumber: z.string(),
  dispatchDetails: z.string().optional(),
  fault: z.string().default(""),
});

const materialEntrySchema = new mongoose.Schema(MaterialEntrySchema.shape, {
  timestamps: true,
});

const MaterialEntry = mongoose.model("MaterialEntry", materialEntrySchema);

module.exports = MaterialEntry;
module.exports.MaterialEntrySchema = MaterialEntrySchema;
