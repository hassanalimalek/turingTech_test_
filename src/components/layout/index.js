import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from 'components/modules/navbar'

function Layout (props) {
  return (
    <div className='app-main-container'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
