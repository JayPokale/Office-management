const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config");
// const checkAuth = require("./middlewares/checkAuth");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

connectDB();
// app.use("/api/v0", checkAuth);
app.use("/api/v0", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
