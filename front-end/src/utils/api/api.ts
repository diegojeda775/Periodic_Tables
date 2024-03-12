/* eslint-disable @typescript-eslint/no-explicit-any */
import formatReservationDate from "../date/formatReservationDate";
import formatReservationTime from "../date/formatReservationTime";
type Table = {
  id: string;
  name: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
  reservationId?: string | null;
};
const API_BASE_URL = import.meta.env.API_URL || "http://localhost:5000";

const headers = new Headers();
headers.append("Content-Type", "application/json");

const fetchJson = async (
  url: string | URL | Request,
  options: RequestInit | undefined
) => {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    console.log(payload);

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("Aborted");
      return;
    }
    console.log(error.stack);
    throw error;
  }
};

export const getReservations = async (
  params: { [s: string]: any } | ArrayLike<unknown>,
  signal: any
) => {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });
  let result = await fetchJson(url, { headers, signal });

  result = formatReservationDate(result);
  result = formatReservationTime(result);

  return result;
};

export const getTables = async (signal: any) => {
  const url = new URL(`${API_BASE_URL}/tables`);
  const result = await fetchJson(url, { headers, signal });
  return result;
};

export async function deleteOnFinish(tableId: string, signal: AbortSignal) {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}`);
  const options = {
    method: "DELETE",
    headers,
    signal,
  };
  return await fetchJson(url, options);
}

export async function cancelStatus(resId: string, signal: AbortSignal) {
  const url = `${API_BASE_URL}/reservations/${resId}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ status: "cancelled" }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function readReservation(
  resId: string | undefined,
  signal: AbortSignal
) {
  const url = new URL(`${API_BASE_URL}/reservations/${resId}`);

  return await fetchJson(url, { headers, signal });
}

export async function updateTable(
  table: Table,
  reservationId: string,
  signal: AbortSignal
) {
  const url = `${API_BASE_URL}/tables/${table.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ ...table, reservationId }),
    signal,
  };
  return await fetchJson(url, options);
}
