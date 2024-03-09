/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
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

export default function TablesDisplay() {
  const {tables}: any = useData()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action Buttons</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tables.map((table : any) => {
          return (
            <TableRow key={table.id}>
              <TableCell>{table.id}</TableCell>
              <TableCell>{table.name}</TableCell>
              <TableCell>{table.capacity}</TableCell>
              <TableCell>{table.reservationId ? "Occupied" : "Free"}</TableCell>
              <TableCell>
                {table.reservationId ? <Button>Finish</Button> : ""}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

