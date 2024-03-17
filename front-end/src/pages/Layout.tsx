import AllRoutes from '@/components/AllRoutes'
import { DataProvider } from '@/components/DataContext'
import Navigation from '@/components/Navigation'
import React from 'react'

function Layout() {
  return (
  <div className='flex flex-col '>
    <div className='col-span-3 h-full bg-slate-500'>
      <Navigation />
    </div>
    <div className='col-span-2 '>
      <DataProvider>
        <AllRoutes />
      </DataProvider>
    </div>
  </div>
  )
}

export default Layout