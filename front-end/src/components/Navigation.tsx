import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className='flex flex-col container max-w-md w-full items-center'>
      <Link to='/'>Periodic Tables</Link>
      <hr />
      <Link to='/'>Dashboard</Link>
      <Link to='/reservations/search'>Search</Link>
      <Link to='/reservations/new'>New Reservation</Link>
      <Link to='/tables/new'>Add Table</Link>
    </nav>
  )
}

export default Navigation