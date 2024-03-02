import { formatAsTime } from "./date-time";

function formatTime(reservation) {
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
export default function formatReservationTime(reservations) {
  return Array.isArray(reservations)
    ? reservations.map(formatTime)
    : formatTime(reservations);
}
