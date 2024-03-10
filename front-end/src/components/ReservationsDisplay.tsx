/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { useData } from './DataContext'
import ReservationButtons from "./ReservationButtons";

type Reservation = {
  id?: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  date?: string;
  time?: string;
  status?: string;
  party?: number;
  createdAt?: string;
  updatedAt?: string;
};

function ReservationsDisplay() {
  const {reservations}: any = useData()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Party</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action Buttons</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((res: Reservation) => {
          return (
            <TableRow key={res.id}>
              <TableCell>{res.firstName}{" "}{res.lastName}</TableCell>
              <TableCell>{res.mobileNumber}</TableCell>
              <TableCell>{res.date}</TableCell>
              <TableCell>{res.time}</TableCell>
              <TableCell>{res.party}</TableCell>
              <TableCell>{res.status?.toUpperCase()}</TableCell>
              <TableCell>
                <ReservationButtons reservation={res}/>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ReservationsDisplay