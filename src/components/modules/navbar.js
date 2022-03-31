import React, { useContext } from 'react'
import jwtService from 'services/jwtService'
import AppContext from 'store/app-context'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const appCtx = useContext(AppContext)
  return (
    <div>
      <ul class='nav justify-content-between bg-dark white p-3'>
        <li class='nav-item'>
          <Link to='/admin/calls' style={{ textDecoration: 'none' }}>
            <h3 className='text-white' href='#'>
              Turing Technologies
            </h3>
          </Link>
        </li>
        <li class='nav-item'>
          <Button
            className=' btn btn-light'
            href='#'
            onClick={() => {
              jwtService.logout()
              appCtx.setUserData(false)
              appCtx.setAppLoading(false)
            }}
          >
            Logout
          </Button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
