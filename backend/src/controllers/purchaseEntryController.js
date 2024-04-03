const PurchaseEntry = require("../models/purchaseEntryModel");

const create = async (req, res) => {
  const { body } = req;

  try {
    const purchaseEntry = new PurchaseEntry(body);
    await purchaseEntry.validate();
    await purchaseEntry.save();

    res.status(201).json(purchaseEntry);
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

    const purchaseEntries = await PurchaseEntry.find(query)
      .sort({ date: "desc" })
      .skip(skip)
      .limit(11);

    const hasMoreEntries = purchaseEntries.length === 11;

    res.status(200).json({
      entries: purchaseEntries.slice(0, 10),
      hasMoreEntries,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const purchaseEntry = await PurchaseEntry.findById(req.params.id);
    if (!purchaseEntry) {
      return res.status(404).json({ error: "Purchase Entry not found" });
    }
    res.status(200).json(purchaseEntry);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  const { body } = req;

  try {
    const purchaseEntry = await PurchaseEntry.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!purchaseEntry) {
      return res.status(404).json({ error: "Purchase Entry not found" });
    }

    res.status(200).json(purchaseEntry);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const remove = async (req, res) => {
  try {
    const purchaseEntry = await PurchaseEntry.findByIdAndDelete(req.params.id);
    if (!purchaseEntry) {
      return res.status(404).json({ error: "Purchase Entry not found" });
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
