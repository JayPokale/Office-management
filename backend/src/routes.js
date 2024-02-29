const express = require("express");
const router = express.Router();

const materialEntryRoutes = require("./routes/materialEntryRoutes");
const paymentDetailsRoutes = require("./routes/paymentDetailsRoutes");
const purchaseDetailsRoutes = require("./routes/purchaseDetailsRoutes");
const serviceDetailsRoutes = require("./routes/serviceDetailsRoutes");

router.use("/material-entry", materialEntryRoutes);
router.use("/payment-details", paymentDetailsRoutes);
router.use("/purchase-details", purchaseDetailsRoutes);
router.use("/service-details", serviceDetailsRoutes);

module.exports = router;
