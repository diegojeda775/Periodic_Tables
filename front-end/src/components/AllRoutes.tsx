import { Routes ,Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import ReservationForm from '../pages/ReservationForm'
import ReservationSeat from '../pages/ReservationSeat'
import TableForm from '../pages/TableForm'
import ReservationSearch from '@/pages/ReservationSearch'

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/reservations">
        <Route path="new" element={<ReservationForm/>}/>
        <Route path='search' element={<ReservationSearch/>}/>
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