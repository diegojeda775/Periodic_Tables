import React from "react"
import { useData } from "@/components/DataContext"
import { useNavigate } from 'react-router-dom'
import { next, previous, today } from "@/utils/date/date-time"
import ErrorAlert from "@/components/ErrorAlert"
import { Button } from "@/components/ui/button"
import ReservationsDisplay from "@/components/ReservationsDisplay"
import TablesDisplay from "@/components/TablesDisplay"

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
      <div className="container"><h4>Reservations for {date}</h4></div>
      <div className="container items-center">
        <Button className="m-2 bg-blue-600" onClick={() => navigate(`/?date=${previous(date)}`)}>
          Previous
        </Button>
        <Button className="m-2 bg-yellow-400" variant={"secondary"} onClick={() => navigate(`/?date=${today()}`)}>
          Today
        </Button>
        <Button className="m-2 bg-blue-600" onClick={() => navigate(`/?date=${next(date)}`)}>
          Next
        </Button>
      </div>
      <div className="container">
        <h3>Reservations</h3>
        <ErrorAlert error={reservationsError}/>
        <ReservationsDisplay />
      </div>
      <div className="container">
        <h3>Tables</h3>
        <ErrorAlert error={tablesError}/>
        <TablesDisplay />
      </div>

    </main>
  )
}

export default Dashboard