/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { cancelStatus } from '@/utils/api/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReservationButtons({reservation}: any) {
  
  const abortControllerRef = useRef<AbortController>();
  const navigate = useNavigate()
  const handleCancel =  async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController
      const confirmBox = window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      );
      if(confirmBox){
        console.log('confirmed')
        await cancelStatus(reservation.id, abortControllerRef.current?.signal)
        navigate('/')
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error)
    }
  }
  if(reservation.status === 'booked'){
    return (
      <>
        <Button className="m-2 bg-green-600">
          <Link to={`/reservations/${reservation.id}/seat`}>Seat</Link>
        </Button>
        <Button className="m-2 bg-blue-600"variant={'secondary'}>
          <Link to={`/reservations/${reservation.id}/edit`}>Edit</Link>
        </Button>
        <Button className="m-2"variant={'destructive'} onClick={handleCancel}>Cancel</Button>
      </>
    )
  }

  return <div></div>
}

