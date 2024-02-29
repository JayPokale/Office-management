const mongoose = require("mongoose");
const { z } = require("zod");

const PurchaseDetailsSchema = z.object({
  userId: z.string(),
  date: z.date(),
  customerName: z.string(),
  productDetails: z.string(),
  materialUsed: z.string(),
  chalanNumber: z.string(),
  cost: z.number().default(0),
  status: z.enum(["Pending", "Completed"]).default("Pending"),
});

const purchaseDetailsSchema = new mongoose.Schema(PurchaseDetailsSchema.shape, {
  timestamps: true,
});

const PurchaseDetails = mongoose.model(
  "PurchaseDetails",
  purchaseDetailsSchema
);

module.exports = PurchaseDetails;
module.exports.PurchaseDetailsSchema = PurchaseDetailsSchema;
