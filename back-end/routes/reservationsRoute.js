import express from "express";
const router = express.Router();

import {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservations,
  deleteReservation,
} from "../controllers/reservationsController.js";

import {
  hasValidFields,
  onlyIfBooked,
  reservationExists,
  reservationStatus,
} from "../middlewares/utils/reservationUtils.js";

router
  .route("/:reservationId/status")
  .put(reservationExists, reservationStatus, updateReservation);

router
  .route("/:reservationId")
  .get(reservationExists, getReservation)
  .put(reservationExists, hasValidFields, onlyIfBooked, updateReservation)
  .delete(reservationExists, deleteReservation);

router
  .route("/")
  .get(getReservations)
  .post(hasValidFields, createReservation)
  .delete(deleteReservations);

export default router;
