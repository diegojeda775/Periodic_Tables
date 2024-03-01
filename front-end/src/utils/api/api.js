const API_BASE_URL = process.env.API_URL || "http://localhost:5000";

export const getReservations = async (params, signal, setError) => {
  const url = new URL(`${API_BASE_URL}/reservations`);
};
