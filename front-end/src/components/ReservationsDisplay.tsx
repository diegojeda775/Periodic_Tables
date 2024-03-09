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
import { Button } from './ui/button';

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
                <Button className="m-2 bg-green-600">Seat</Button>
                <Button className="m-2 bg-blue-600"variant={'secondary'}>Edit</Button>
                <Button className="m-2"variant={'destructive'}>Cancel</Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ReservationsDisplay