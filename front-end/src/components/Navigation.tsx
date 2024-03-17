import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'


function Navigation() {
  return (
    <nav className='flex flex-col container max-w-md w-full items-center'>
      <Link className='m-2' to='/'>Periodic Tables</Link>
      <hr />
      <Button variant="link"><Link to='/'>Dashboard</Link></Button>
      <Button variant="link"><Link to='/reservations/search'>Search</Link></Button>
      <Button variant="link"><Link to='/reservations/new'>New Reservation</Link></Button>
      <Button variant="link"><Link to='/tables/new'>Add Table</Link></Button>
    </nav>
  )
}

export default Navigation