const PaymentEntry = require("../models/paymentEntryModel");

const create = async (req, res) => {
  const { body } = req;

  try {
    const paymentEntry = new PaymentEntry(body);
    await paymentEntry.validate();
    await paymentEntry.save();

    res.status(201).json(paymentEntry);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const getAll = async (req, res) => {
  try {
    const { skip = 0, status } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const paymentEntries = await PaymentEntry.find(query)
      .sort({ date: "desc" })
      .skip(skip)
      .limit(11);

    const hasMoreEntries = paymentEntries.length === 11;

    res.status(200).json({
      entries: paymentEntries.slice(0, 10),
      hasMoreEntries,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const paymentEntry = await PaymentEntry.findById(req.params.id);
    if (!paymentEntry) {
      return res.status(404).json({ error: "Payment Entry not found" });
    }
    res.status(200).json(paymentEntry);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  const { body } = req;

  try {
    const paymentEntry = await PaymentEntry.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!paymentEntry) {
      return res.status(404).json({ error: "Payment Entry not found" });
    }

    res.status(200).json(paymentEntry);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const remove = async (req, res) => {
  try {
    const paymentEntry = await PaymentEntry.findByIdAndDelete(req.params.id);
    if (!paymentEntry) {
      return res.status(404).json({ error: "Payment Entry not found" });
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
