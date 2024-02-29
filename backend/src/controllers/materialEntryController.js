const MaterialEntry = require("../models/materialEntryModel");
const { MaterialEntrySchema } = require("../models/materialEntryModel");

const validate = (req, res, next) => {
  try {
    MaterialEntrySchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const create = async (req, res) => {
  try {
    const materialEntry = new MaterialEntry(req.body);
    await materialEntry.save();
    res.status(201).json(materialEntry);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const getAll = async (req, res) => {
  try {
    const materialEntries = await MaterialEntry.find();
    res.status(200).json(materialEntries);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const materialEntry = await MaterialEntry.findById(req.params.id);
    if (!materialEntry) {
      return res.status(404).json({ error: "Material Entry not found" });
    }
    res.status(200).json(materialEntry);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const materialEntry = await MaterialEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!materialEntry) {
      return res.status(404).json({ error: "Material Entry not found" });
    }
    res.status(200).json(materialEntry);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const remove = async (req, res) => {
  try {
    const materialEntry = await MaterialEntry.findByIdAndDelete(req.params.id);
    if (!materialEntry) {
      return res.status(404).json({ error: "Material Entry not found" });
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
