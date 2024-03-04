const PaymentDetails = require("../models/paymentDetailsModel");

const create = async (req, res) => {
  const { body } = req;

  try {
    const paymentDetails = new PaymentDetails(body);
    await paymentDetails.validate();
    await paymentDetails.save();

    res.status(201).json(paymentDetails);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', amount } = req.query;

    const query = {};
    if (amount) {
      query.amount = amount;
    }

    const skip = (page - 1) * limit;

    const paymentDetails = await PaymentDetails.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder });

    res.status(200).json(paymentDetails);
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
  const { body } = req;

  try {
    const paymentDetails = await PaymentDetails.findByIdAndUpdate(
      req.params.id,
      body,
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
  create,
  getAll,
  getById,
  update,
  remove,
};
