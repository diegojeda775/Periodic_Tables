import { useRef, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "dashboard",
      },
    ],
  },
]);

function App() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef(null);

  const loadDashboard = () => {
    try {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      setReservationsError(null);
      setIsLoading(true);
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

  return <RouterProvider router={router} />;
}

export default App;
