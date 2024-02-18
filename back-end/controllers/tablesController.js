import { prisma } from "../db/db";

const Table = prisma.table;

//Read
const getTables = async (req, res, next) => {
  try {
    const tables = await Table.findMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ data: tables });
  } catch (error) {
    next(error);
  }
};

// Create
const createTable = async (req, res, next) => {
  try {
    const createdTable = await Table.create({ data: req.body.data });
    res
      .status(201)
      .setHeader("Content-Type", "application/json")
      .json(createdTable);
  } catch (error) {
    next(error);
  }
};
// Delete
const deleteTables = async (req, res, next) => {
  try {
    const deletedTables = await Table.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(deletedTables);
  } catch (error) {
    next(error);
  }
};

//:tableId
//Read
const getTable = async (req, res, next) => {
  try {
    const table = await Table.findFirst({
      where: {
        id: req.params.tableId,
      },
    });
    res.status(200).setHeader("Content-Type", "application/json").json(table);
  } catch (error) {
    next(error);
  }
};
// Update
const updateTable = async (req, res, next) => {
  try {
    const updatedTable = await Table.update({
      where: { id: req.params.tableId },
      data: req.body,
    });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(updatedTable);
  } catch (error) {
    next(error);
  }
};
//Delete
const deleteTable = async (req, res, next) => {
  try {
    const table = await Table.delete({
      where: {
        id: req.params.tableId,
      },
    });
    res.status(200).setHeader("Content-Type", "application/json").json(table);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTables,
  deleteTable,
};
