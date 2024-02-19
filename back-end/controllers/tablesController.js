import prisma from "../db/db.js";

const Table = prisma.table;

//Read
const getTables = async (req, res, next) => {
  try {
    const tables = await Table.findMany();
    res.status(200).setHeader("Content-Type", "application/json").json(tables);
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
    const updatedTable = {
      ...res.locals.table,
      reservationId: req.body.reservationId,
    };

    await prisma.reservation.update({
      where: {
        id: req.body.reservationId,
      },
      data: {
        status: "seated",
      },
    });

    const data = await Table.update({
      where: { id: req.params.tableId },
      data: updatedTable,
    });

    res.status(200).setHeader("Content-Type", "application/json").json(data);
  } catch (error) {
    next(error);
  }
};
//Delete
const deleteTable = async (req, res, next) => {
  try {
    const { tableId } = req.params;
    const resIdOnTable = res.locals.reservationId;
    const tableToUpdate = res.locals.table;

    await prisma.reservation.update({
      where: {
        id: resIdOnTable,
      },
      data: {
        status: "finished",
      },
    });

    tableToUpdate.reservationId = null;

    await Table.update({
      where: {
        id: tableId,
      },
      data: tableToUpdate,
    });

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(`table with Id: ${tableId} is now free`);
  } catch (error) {
    next(error);
  }
};

export {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTables,
  deleteTable,
};
