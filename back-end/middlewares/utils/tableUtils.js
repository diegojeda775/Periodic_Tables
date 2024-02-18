import prisma from "../../db/db.js";

//Table
const tableValidFields = ["name", "capacity"];

// CREATE MIDDLEWARE VALIDATION HELPER FUNCTION
export function tableValidator(data, validFields) {
  // returns an array of fields that are invalid
  const fieldsNotValid = [];

  if (!data.name || data.name.length < 2) {
    fieldsNotValid.push("name");
  }
  if (data.capacity < 1 || typeof data.capacity !== "number") {
    fieldsNotValid.push("capacity");
  }
  const dataFields = Object.getOwnPropertyNames(data);
  validFields.forEach((field) => {
    if (!dataFields.includes(field)) {
      fieldsNotValid.push(field);
    }
  });
  return fieldsNotValid;
}

// CREATE MIDDLEWARE 1 OF 1
export function hasValidCreateFields(req, res, next) {
  const table = req.body;
  const invalidFields = tableValidator(table, tableValidFields);
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid fields(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

// UPDATE MIDDLEWARE 1 of 2
export async function tableExists(req, res, next) {
  const { tableId } = req.params;
  const table = await prisma.table.findFirst({
    where: {
      id: tableId,
    },
  });

  if (table) {
    res.locals.table = table;
    return next();
  } else {
    next({ status: 404, message: `Table ${tableId} cannot be found.` });
  }
}

// UPDATE MIDDLEWARE 2 of 2
export async function validateToSeatTable(req, res, next) {
  let table = res.locals.table;
  if (!req.body.data || !req.body.data.reservationId) {
    return next({
      status: 400,
      message: `No reservationId/data`,
    });
  }
  const reservation = await prisma.reservation.findFirst({
    where: {
      id: req.body.data.reservationId,
    },
  });

  if (!reservation) {
    return next({
      status: 404,
      message: `Reservation ${req.body.data.reservationId} does not exist`,
    });
  }

  if (table.reservationId) {
    return next({
      status: 400,
      message: `Table occupied`,
    });
  }
  if (reservation.party > table.capacity) {
    return next({
      status: 400,
      message: `Table does not have sufficient capacity`,
    });
  }
  if (reservation.status === "seated") {
    return next({
      status: 400,
      message: `reservation is already seated`,
    });
  }
  next();
}

// DESTROY MIDDLEWARE 1 of 2
export async function tableIdExists(req, res, next) {
  const tableId = req.params.tableId;

  const table = await prisma.table.findFirst({
    where: {
      id: tableId,
    },
  });

  if (table) {
    res.locals.table = table;
    return next();
  }
  return next({
    status: 404,
    message: `${tableId} table_id is non-existent.`,
  });
}

// DESTROY MIDDLEWARE 2 of 2
export async function tableNotOccupied(req, res, next) {
  const { tableId } = req.params;
  const table = res.locals.table;

  if (table.reservationId) {
    res.locals.table = table;
    res.locals.reservationId = table.reservationId;
    return next();
  }
  return next({
    status: 400,
    message: `tableId: ${tableId} is not occupied`,
  });
}
