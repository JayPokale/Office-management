const PaymentDetails = require("../models/paymentDetailsModel");
const { PaymentDetailsSchema } = require("../models/paymentDetailsModel");

const validate = (req, res, next) => {
  try {
    PaymentDetailsSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const create = async (req, res) => {
  try {
    const paymentDetails = new PaymentDetails(req.body);
    await paymentDetails.save();
    res.status(201).json(paymentDetails);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const getAll = async (req, res) => {
  try {
    const paymentDetailsList = await PaymentDetails.find();
    res.status(200).json(paymentDetailsList);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const paymentDetails = await PaymentDetails.findById(req.params.id);
    if (!paymentDetails) {
      return res.status(404).json({ error: "Payment Details not found" });
    }
    res.status(200).json(paymentDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const paymentDetails = await PaymentDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!paymentDetails) {
      return res.status(404).json({ error: "Payment Details not found" });
    }
    res.status(200).json(paymentDetails);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const remove = async (req, res) => {
  try {
    const paymentDetails = await PaymentDetails.findByIdAndDelete(
      req.params.id
    );
    if (!paymentDetails) {
      return res.status(404).json({ error: "Payment Details not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  validate,
  create,
  getAll,
  getById,
  update,
  remove,
};
