import { formatAsTime } from "./date-time";

type Reservation = {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  date: string;
  time: string;
  status: string;
  party: number;
  createdAt: string;
  updatedAt: string;
};

function formatTime(reservation: Reservation) {
  reservation.time = formatAsTime(reservation.time);
  return reservation;
}

/**
 * Formats the reservation_time property of a reservation.
 * @param reservations
 *  a single reservation, or an array of reservations.
 * @returns {[reservation]|reservation}
 *  the specified reservation(s) with the reservation_time property formatted as HH:MM.
 */
export default function formatReservationTime(reservations: Reservation) {
  return Array.isArray(reservations)
    ? reservations.map(formatTime)
    : formatTime(reservations);
}
