const ServiceDetails = require("../models/serviceDetailsModel");

const create = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      customerName,
    } = req.query;

    const query = {};
    if (customerName) {
      query.customerName = customerName;
    }

    const skip = (page - 1) * limit;

    const serviceDetails = await ServiceDetails.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder });

    res.status(200).json(serviceDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      customerName,
    } = req.query;

    const query = {};
    if (customerName) {
      query.customerName = customerName;
    }

    const skip = (page - 1) * limit;

    const serviceDetails = await ServiceDetails.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder });

    res.status(200).json(serviceDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const serviceDetails = await ServiceDetails.findById(req.params.id);
    if (!serviceDetails) {
      return res.status(404).json({ error: "Service Details not found" });
    }
    res.status(200).json(serviceDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  const { body } = req;

  try {
    const serviceDetails = await ServiceDetails.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!serviceDetails) {
      return res.status(404).json({ error: "Service Details not found" });
    }

    res.status(200).json(serviceDetails);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const remove = async (req, res) => {
  try {
    const serviceDetails = await ServiceDetails.findByIdAndDelete(
      req.params.id
    );
    if (!serviceDetails) {
      return res.status(404).json({ error: "Service Details not found" });
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
