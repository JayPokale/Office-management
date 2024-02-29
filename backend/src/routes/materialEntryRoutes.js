const express = require("express");
const router = express.Router();
const {
  validate,
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/materialEntryController");

router.post("/", validate, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", validate, update);
router.delete("/:id", remove);

module.exports = router;
