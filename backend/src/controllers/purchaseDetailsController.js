const PurchaseDetails = require("../models/purchaseDetailsModel");
const { PurchaseDetailsSchema } = require("../models/purchaseDetailsModel");

const validate = (req, res, next) => {
  try {
    PurchaseDetailsSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const create = async (req, res) => {
  try {
    const purchaseDetails = new PurchaseDetails(req.body);
    await purchaseDetails.save();
    res.status(201).json(purchaseDetails);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const getAll = async (req, res) => {
  try {
    const purchaseDetailsList = await PurchaseDetails.find();
    res.status(200).json(purchaseDetailsList);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const purchaseDetails = await PurchaseDetails.findById(req.params.id);
    if (!purchaseDetails) {
      return res.status(404).json({ error: "Purchase Details not found" });
    }
    res.status(200).json(purchaseDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const purchaseDetails = await PurchaseDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!purchaseDetails) {
      return res.status(404).json({ error: "Purchase Details not found" });
    }
    res.status(200).json(purchaseDetails);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const remove = async (req, res) => {
  try {
    const purchaseDetails = await PurchaseDetails.findByIdAndDelete(
      req.params.id
    );
    if (!purchaseDetails) {
      return res.status(404).json({ error: "Purchase Details not found" });
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
