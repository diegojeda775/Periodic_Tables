import { Routes ,Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import NotFound from './NotFound'
import ReservationForm from './ReservationForm'
import ReservationSeat from './ReservationSeat'
import TableForm from './TableForm'

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/reservations">
        <Route path="new" element={<ReservationForm/>}/>
        <Route path=":resId/edit" element={<ReservationForm/>}/>
        <Route path=":resId/seat" element={<ReservationSeat/>}/>
      </Route>
      <Route path="/tables">
        <Route path="new" element={<TableForm/>}/>
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

export default AllRoutes