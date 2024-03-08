import React from "react"
import { useData } from "@/components/DataContext"
import { useNavigate } from 'react-router-dom'
import { next, previous, today } from "@/utils/date/date-time"
import ErrorAlert from "@/components/ErrorAlert"

type DataContextValue = {
  date?: string | null
  reservations?: object[]
  tables?: object[]
  setReservations?: React.Dispatch<React.SetStateAction<never[]>>
  setTables?: React.Dispatch<React.SetStateAction<never[]>>
  reservationsError?: null | object
  tablesError?: null | object
  setReservationsError?: React.Dispatch<React.SetStateAction<null>> | React.Dispatch<React.SetStateAction<object>>
  setTablesError?: React.Dispatch<React.SetStateAction<null>> | React.Dispatch<React.SetStateAction<object>>
}
function Dashboard() {
  const {date, reservationsError, tablesError}: DataContextValue = useData()
  const navigate = useNavigate()

  

  return (
    <main>
      <h1>Dashboard</h1>
      <div><h4>Reservations for {date}</h4></div>
      <div>
        <button onClick={() => navigate(`/?date=${previous(date)}`)}>
          Previous
        </button>
        <button onClick={() => navigate(`/?date=${today()}`)}>
          Today
        </button>
        <button onClick={() => navigate(`/?date=${next(date)}`)}>
          Next
        </button>
      </div>
      <div>
        <ErrorAlert error={reservationsError}/>
      </div>
      <div>
        <ErrorAlert error={tablesError}/>
      </div>

    </main>
  )
}

export default Dashboard