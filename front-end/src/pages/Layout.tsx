import AllRoutes from '@/components/AllRoutes'
import { DataProvider } from '@/components/DataContext'
import Navigation from '@/components/Navigation'
import React from 'react'

function Layout() {
  return (
  <div className='flex flex-col md:flex-row max-w-full' >
    <div className=' h-full bg-slate-500'>
      <Navigation />
    </div>
    <div className=' '>
      <DataProvider>
        <AllRoutes />
      </DataProvider>
    </div>
  </div>
  )
}

export default Layout