import { prisma } from "../db/db";

const Table = prisma.table;

// List
const getTables = async (req, res, next) => {
  try {
    const result = await Table.findMany();
    res.status(200).setHeader("Content-Type", "application/json").json(result);
  } catch (error) {
    next(error);
  }
};

// Create
const createTable = async (req, res, next) => {
  try {
    const createdTable = await Table.create({ data: req.body });
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
    const { count } = await Table.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ data: { message: `${count} tables deleted` } });
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

module.exports = {
  getTables,
  createTable,
  updateTable,
  deleteTables,
};
