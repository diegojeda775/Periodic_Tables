import prisma from "../../db/db.js";
//Reservation
// VALIDATION FUNCTION hasValidFields SUPPORT
const reservationValidFields = [
  "firstName",
  "lastName",
  "mobileNumber",
  "date",
  "time",
  "party",
];

// HELPER FN FOR hasValidFields SUPPORT
function notNull(obj) {
  for (let key in obj) {
    if (!obj[key]) return false;
  }
  return true;
}

// HELPER FN FOR hasValidFields SUPPORT
function isPast(date) {
  const temp = date.split("-");
  const newDate = new Date(
    Number(temp[0]),
    Number(temp[1]) - 1,
    Number(temp[2]) + 1
  );
  // indexing for the months etc.
  return newDate.getTime() < new Date().getTime();
}

// CREATE MIDDLEWARE 1 OF 1  &  UPDATE 2 of 3
export function hasValidFields(req, res, next) {
  const reservation = req.body;

  const dataFields = Object.getOwnPropertyNames(reservation);
  reservationValidFields.forEach((field) => {
    if (!dataFields.includes(field)) {
      return next({
        status: 400,
        message: `The ${field} is missing`,
      });
    }
  });

  if (!notNull(reservation)) {
    // checks if empty
    return next({
      status: 400,
      message:
        "Invalid data format provided. Requires {string: [firstName, lastName, mobileNumber], date: date, time: time, number: party}",
    });
  }

  const reserveDate = new Date(reservation.date);

  if (typeof reservation.party !== "number") {
    return next({
      status: 400,
      message: "Needs to be a number, people is not a number.",
    });
  }

  if (!/\d{4}-\d{2}-\d{2}/.test(reservation.date)) {
    return next({
      status: 400,
      message: "reservation_date is not a date.",
    });
  }
  if (reserveDate.getDay() === 1) {
    // 1 is Tuesday
    return next({
      status: 400,
      message:
        "Reservations cannot be made on a Tuesday, the restaurant is closed.",
    });
  }

  if (isPast(reservation.date)) {
    return next({
      status: 400,
      message: "Reservations must be made for a future date.",
    });
  }

  if (!/[0-9]{2}:[0-9]{2}/.test(reservation.time)) {
    return next({
      status: 400,
      message: "reservation_time is not a time.",
    });
  }

  if (reservation.time < "10:30" || reservation.time > "21:30") {
    return next({
      status: 400,
      message: "Reservations cannot be made before 10:30am or after 9:30pm.",
    });
  }

  if (reservation.status === "seated" || reservation.status === "finished") {
    return next({
      status: 400,
      message: "reservation is seated or finished",
    });
  }

  next();
}

// READ MIDDLEWARE 1 OF 1  &  UPDATE STATUS 1 OF 3
export async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await prisma.reservation.findFirst({
    where: {
      id: reservationId,
    },
  });
  if (reservation) {
    res.locals.reservation = reservation;
    next();
  } else {
    next({
      status: 404,
      message: `Reservation id does not exist: ${reservationId}`,
    });
  }
}

// UPDATE STATUS MIDDLEWARE 2 OF 3 (after reservationExists 1st)
export async function reservationStatusFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({
      status: 400,
      message: "reservation is currently finished",
    });
  }
  return next();
}

// UPDATE STATUS MIDDLEWARE 3 OF 3
export async function reservationStatus(req, res, next) {
  const { status } = res.locals.reservation;

  if (!["finished", "seated", "cancelled", "booked"].includes(status)) {
    return next({
      status: 400,
      message: "reservation has an unknown status",
    });
  }

  if (status === "finished") {
    return next({
      status: 400,
      message: "reservation is currently finished",
    });
  }

  return next();
}

// UPDATE MIDDLEWARE 3 of 3
export async function onlyIfBooked(req, res, next) {
  const { status } = req.body;
  const { reservationId } = req.params;
  if (status !== "booked") {
    return next({
      status: 400,
      message: `The reservation_id ${reservationId} status is not booked.`,
    });
  }
  return next();
}
