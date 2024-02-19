import prisma from "../db/db.js";

const Reservation = prisma.reservation;

//Read
const getReservations = async (req, res, next) => {
  try {
    const mobileNumber = req.query.mobile_number;
    const date = new Date(req.query.date);

    const filterArgs = {
      where: {},
      orderBy: {},
    };
    //TODO
    if (mobileNumber) {
    }

    if (date) {
      filterArgs.where.date = date;
      filterArgs.where.NOT = { status: "finished" };
      filterArgs.orderBy.time = "asc";
    }

    const reservations = await Reservation.findMany(filterArgs);

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(reservations);
  } catch (error) {
    next(error);
  }
};

// Create
const createReservation = async (req, res, next) => {
  try {
    const dateTime = new Date(`${req.body.date}, ${req.body.time}`);
    const resToBeCreated = {
      ...req.body,
      date: dateTime,
      time: dateTime,
    };
    const createdReservation = await Reservation.create({
      data: resToBeCreated,
    });
    res
      .status(201)
      .setHeader("Content-Type", "application/json")
      .json(createdReservation);
  } catch (error) {
    next(error);
  }
};
// Delete
const deleteReservations = async (req, res, next) => {
  try {
    const deletedReservations = await Reservation.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(deletedReservations);
  } catch (error) {
    next(error);
  }
};

//:reservationId
//Read
const getReservation = async (req, res, next) => {
  try {
    const { reservation } = res.locals;
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(reservation);
  } catch (error) {
    next(error);
  }
};
// Update
const updateReservation = async (req, res, next) => {
  try {
    let resToBeUpdated = { ...res.locals.reservation, ...req.body };
    if (req.body.date || req.body.time) {
      const dateTime = new Date(`${req.body.date}, ${req.body.time}`);
      resToBeUpdated = {
        ...resToBeUpdated,
        date: dateTime,
        time: dateTime,
      };
    }
    const updatedReservation = await Reservation.update({
      where: { id: req.params.reservationId },
      data: resToBeUpdated,
    });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(updatedReservation);
  } catch (error) {
    next(error);
  }
};
//Delete
const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.delete({
      where: {
        id: req.params.reservationId,
      },
    });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(reservation);
  } catch (error) {
    next(error);
  }
};

export {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservations,
  deleteReservation,
};
