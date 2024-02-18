import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/error.js";
import table from "./routes/tablesRoute.js";
import logger from "./middlewares/logger.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(logger);

app.use("/tables", table);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
