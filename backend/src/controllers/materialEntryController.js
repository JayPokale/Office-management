const MaterialEntry = require("../models/materialEntryModel");

const create = async (req, res) => {
  const { body } = req;

  try {
    const materialEntry = new MaterialEntry(body);
    await materialEntry.validate();
    await materialEntry.save();

    res.status(201).json(materialEntry);
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

    const materialEntries = await MaterialEntry.find(query)
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(11);

    const hasMoreEntries = materialEntries.length === 11;

    res.status(200).json({
      entries: materialEntries.slice(0, 10),
      hasMoreEntries,
    });
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
  const { body } = req;

  try {
    const materialEntry = await MaterialEntry.findByIdAndUpdate(
      req.params.id,
      body,
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
  create,
  getAll,
  getById,
  update,
  remove,
};
