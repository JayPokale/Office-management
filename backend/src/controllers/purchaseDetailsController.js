const PurchaseDetails = require("../models/purchaseDetailsModel");

const create = async (req, res) => {
  const { body } = req;

  try {
    const purchaseDetails = new PurchaseDetails(body);
    await purchaseDetails.validate();
    await purchaseDetails.save();

    res.status(201).json(purchaseDetails);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      productDetails,
    } = req.query;

    const query = {};
    if (productDetails) {
      query.productDetails = productDetails;
    }

    const skip = (page - 1) * limit;

    const purchaseDetails = await PurchaseDetails.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder });

    res.status(200).json(purchaseDetails);
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
  const { body } = req;

  try {
    const purchaseDetails = await PurchaseDetails.findByIdAndUpdate(
      req.params.id,
      body,
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
  create,
  getAll,
  getById,
  update,
  remove,
};
