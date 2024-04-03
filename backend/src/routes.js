const express = require("express");
const router = express.Router();

const materialEntryRoutes = require("./routes/materialEntryRoutes");
const PaymentEntryRoutes = require("./routes/paymentEntryRoutes");
const PurchaseEntryRoutes = require("./routes/purchaseEntryRoutes");
const ServiceEntryRoutes = require("./routes/serviceEntryRoutes");

router.use("/material-entry", materialEntryRoutes);
router.use("/payment-entry", PaymentEntryRoutes);
router.use("/purchase-entry", PurchaseEntryRoutes);
router.use("/service-entry", ServiceEntryRoutes);

module.exports = router;
