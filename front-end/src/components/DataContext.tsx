/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect, useRef } from "react"
import { getReservations, getTables } from "../utils/api/api";
import { today } from "../utils//date/date-time";
import useQuery from "../utils//date/useQuery";

type DataContextProviderProps = {
  children: React.ReactNode
}

type Table = {
  id: string
  name: string
  capacity: number
  createdAt: Date
  updatedAt: Date
  reservationId?: string | null
}
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

type DataContextValue = {
  date?: string | null
  reservations?: Reservation[]
  tables?: Table[]
  setReservations?: React.Dispatch<React.SetStateAction<never[]>>
  setTables?: React.Dispatch<React.SetStateAction<never[]>>
  reservationsError?: null | object
  tablesError?: null | object
  setReservationsError?: React.Dispatch<React.SetStateAction<null>> | React.Dispatch<React.SetStateAction<object>>
  setTablesError?: React.Dispatch<React.SetStateAction<null>> | React.Dispatch<React.SetStateAction<object>>
}



const DataContext = createContext({})

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  return useContext(DataContext)
}

export const DataProvider = ({children} : DataContextProviderProps) => {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const query = useQuery();
  const date = query.get("date") ? query.get("date") : today();

  const abortControllerRef = useRef<AbortController>();

  const loadDashboard = () => {
    try {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      setReservationsError(null);

      getReservations({ date }, abortControllerRef.current.signal)
        .then(setReservations)
        .catch(setReservationsError);

      getTables(abortControllerRef.current.signal)
        .then((existingTables) => {
          const updatedExistingTables = existingTables.map((table: any) => {
            return { ...table };
          });
          return updatedExistingTables;
        })
        .then(setTables)
        .catch(setTablesError);
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Aborted");
        return;
      }
      console.log(error.stack);
      throw error;
    } 
  };

  useEffect(loadDashboard, [date]);

  const filteredReservations: any[] = reservations.filter((reservation: any) => {
    return reservation.status === "booked" || reservation.status === "seated";
  });

  const value: DataContextValue = {
    reservations: filteredReservations, 
    tables,
    setReservations,
    setReservationsError,
    reservationsError,
    setTables,
    setTablesError,
    tablesError,
    date
  }

  return <DataContext.Provider value={value}>
            {children}
          </DataContext.Provider>
}