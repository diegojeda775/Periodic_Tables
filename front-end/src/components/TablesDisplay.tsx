/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react'
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
import { deleteOnFinish } from '@/utils/api/api';
import { useNavigate } from 'react-router-dom';

export default function TablesDisplay() {
  const {tables}: any = useData()
  const navigate = useNavigate()
  const abortControllerRef = useRef<AbortController>();

  const finishHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, tableId: string) => {
    e.preventDefault();
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    const confirmBox = window.confirm("Is this table ready to seat new guests? This cannot be undone.")
    try {
      if(confirmBox) {
        await deleteOnFinish(tableId, abortControllerRef.current.signal)
        navigate(0)
      }
    } catch (error: any) {
      throw Error(error)
    }

  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
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
              <TableCell>{table.name}</TableCell>
              <TableCell>{table.capacity}</TableCell>
              <TableCell>{table.reservationId ? "Occupied" : "Free"}</TableCell>
              <TableCell>
                {table.reservationId ? 
                  <Button className="m-2 bg-gree-600" onClick={(e) => finishHandler(e, table.id)}>
                    Finish
                  </Button>
                  : ""
                }
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

