/* eslint-disable @typescript-eslint/no-explicit-any */
import formatReservationDate from "../date/formatReservationDate";
import formatReservationTime from "../date/formatReservationTime";

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
