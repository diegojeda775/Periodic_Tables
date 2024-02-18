import express from "express";
const router = express.Router();

import {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTables,
  deleteTable,
} from "../controllers/tablesController.js";

import {
  hasValidCreateFields,
  tableExists,
  validateToSeatTable,
  tableNotOccupied,
  tableIdExists,
} from "../middlewares/utils/tableUtils.js";

router
  .route("/")
  .get(getTables)
  .post(hasValidCreateFields, createTable)
  .delete(deleteTables);

router
  .route("/:tableId")
  .get(tableExists, getTable)
  .put(tableExists, validateToSeatTable, updateTable)
  .delete(tableIdExists, tableNotOccupied, deleteTable);

export default router;
