import { formatAsDate } from "./date-time";

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

function formatDate(reservation: Reservation) {
  reservation.date = formatAsDate(reservation.date);
  return reservation;
}

/**
 * Formats the reservation_date property of a reservation.
 * @param reservations
 *  a single reservation, or an array of reservations.
 * @returns {[reservation]|reservation}
 *  the specified reservation(s) with the reservation_date property formatted as YYYY-MM-DD.
 */
export default function formatReservationDate(reservations: Reservation) {
  return Array.isArray(reservations)
    ? reservations.map(formatDate)
    : formatDate(reservations);
}
