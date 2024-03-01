import { useRef } from "react";
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

  const abortControllerRef = useRef(null);

  const loadDashboard = () => {
    try {
    } catch (error) {}
  };

  return <RouterProvider router={router} />;
}

export default App;
