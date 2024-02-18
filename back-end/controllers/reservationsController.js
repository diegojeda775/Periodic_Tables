import { prisma } from "../db/db";

const Reservation = prisma.reservation;

//Read
const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.findMany();
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
    const createdReservation = await Reservation.create({ data: req.body });
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
    const reservation = await Reservation.findFirst({
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
// Update
const updateReservation = async (req, res, next) => {
  try {
    const updatedReservation = await Reservation.update({
      where: { id: req.params.reservationId },
      data: req.body,
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

module.exports = {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservations,
  deleteReservation,
};
