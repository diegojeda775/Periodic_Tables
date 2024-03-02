import formatReservationDate from "../date/formatReservationDate";
import formatReservationTime from "../date/formatReservationTime";

const API_BASE_URL = process.env.API_URL || "http://localhost:5000";

const fetchJson = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Aborted");
      return;
    }
    console.log(error.stack);
    throw error;
  }
};

export const getReservations = async (params, signal) => {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });
  let result = await fetchJson(url, { headers, signal });

  result = formatReservationDate(result);
  result = formatReservationTime(result);

  return result;
};

export const getTables = (signal) => {
  const url = new URL(`${API_BASE_URL}/tables`);
  const result = fetchJson(url, { headers, signal });
  return result;
};
