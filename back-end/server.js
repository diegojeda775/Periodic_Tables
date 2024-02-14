const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/error");

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
