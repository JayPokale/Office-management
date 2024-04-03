const ServiceEntry = require("../models/serviceEntryModel");

const create = async (req, res) => {
  const { body } = req;

  try {
    const serviceEntry = new ServiceEntry(body);
    await serviceEntry.validate();
    await serviceEntry.save();

    res.status(201).json(serviceEntry);
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

    const serviceEntries = await ServiceEntry.find(query)
      .sort({ date: "desc" })
      .skip(skip)
      .limit(11);

    const hasMoreEntries = serviceEntries.length === 11;

    res.status(200).json({
      entries: serviceEntries.slice(0, 10),
      hasMoreEntries,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const serviceEntry = await ServiceEntry.findById(req.params.id);
    if (!serviceEntry) {
      return res.status(404).json({ error: "Service Entry not found" });
    }
    res.status(200).json(serviceEntry);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  const { body } = req;

  try {
    const serviceEntry = await ServiceEntry.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!serviceEntry) {
      return res.status(404).json({ error: "Service Entry not found" });
    }

    res.status(200).json(serviceEntry);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

const remove = async (req, res) => {
  try {
    const serviceEntry = await ServiceEntry.findByIdAndDelete(req.params.id);
    if (!serviceEntry) {
      return res.status(404).json({ error: "Service Entry not found" });
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
