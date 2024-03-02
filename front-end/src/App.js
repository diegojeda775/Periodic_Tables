import { useEffect, useRef, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import { getReservations, getTables } from "./utils/api/api";
import useQuery from "./utils/date/useQuery";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Dashboard
        date={date}
        reservations={filteredReservations}
        reservationsError={reservationsError}
        tables={tables}
        setTables={setTables}
        tablesError={tablesError}
        loadDashboard={loadDashboard}
      />
    ),
    errorElement: <NotFoundPage />,
  },
]);

function App() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const query = useQuery();
  const date = query.get("date") ? query.get("date") : today();

  const abortControllerRef = useRef(null);

  useEffect(loadDashboard, [date]);

  const loadDashboard = () => {
    try {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      setReservationsError(null);
      setIsLoading(true);

      getReservations({ date }, abortControllerRef.current.signal)
        .then(setReservations)
        .catch(setReservationsError);

      getTables()
        .then((existingTables) => {
          const updatedExistingTables = existingTables.map((table) => {
            return { ...table };
          });
        })
        .then(setTables)
        .catch(setTablesError);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
        return;
      }
      console.log(error.stack);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    return reservation.status === "booked" || reservation.status === "seated";
  });

  return <RouterProvider router={router} />;
}

export default App;
