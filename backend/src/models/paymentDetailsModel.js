const mongoose = require("mongoose");
const { z } = require("zod");

const PaymentDetailsSchema = z.object({
  userId: z.string(),
  date: z.date(),
  customerName: z.string(),
  customerDetails: z.string(),
  billNo: z.string(),
  quotationDetails: z.string().nullable(),
  amountRemaining: z.number().default(0),
  status: z.enum(["Pending", "Paid"]).default("Pending"),
});

const paymentDetailsSchema = new mongoose.Schema(PaymentDetailsSchema.shape, {
  timestamps: true,
});

const PaymentDetails = mongoose.model("PaymentDetails", paymentDetailsSchema);

module.exports = PaymentDetails;
module.exports.PaymentDetailsSchema = PaymentDetailsSchema;
