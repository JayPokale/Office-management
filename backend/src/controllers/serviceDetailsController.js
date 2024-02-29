const ServiceDetails = require("../models/serviceDetailsModel");
const { ServiceDetailsSchema } = require("../models/serviceDetailsModel");

const validate = (req, res, next) => {
  try {
    ServiceDetailsSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const create = async (req, res) => {
  try {
    const serviceDetails = new ServiceDetails(req.body);
    await serviceDetails.save();
    res.status(201).json(serviceDetails);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const getAll = async (req, res) => {
  try {
    const serviceDetailsList = await ServiceDetails.find();
    res.status(200).json(serviceDetailsList);
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
  try {
    const serviceDetails = await ServiceDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
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
  validate,
  create,
  getAll,
  getById,
  update,
  remove,
};
