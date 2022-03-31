import React, { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import './loginStyles.css'
import AppContext from 'store/app-context'

import jwtService from 'services/jwtService'
import ClipLoader from 'react-spinners/ClipLoader'
import TuringMainLogo from 'assets/images/turingMainLogo.svg'

function AdminLogin () {
  let navigate = useNavigate()
  const appCtx = useContext(AppContext)
  const [loading, setLoading] = useState(false)

  const onSubmitLogin = async e => {
    e.preventDefault()

    let data = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    setLoading(true)

    let result = await jwtService.signInAdmin(data)
    setLoading(false)
    if (!result) {
      return false
    } else {
      navigate('/admin/calls')
      appCtx.setUserData(result.user)
    }
  }

  return (
    <div>
      <div className='main-container'>
        <div className='bg-div'>
          <div className='bg-content animated bounceInLeft'>
            <div className='mb-5'>
              {/* <h1>Turing Technologies</h1> */}
              <img
                src={TuringMainLogo}
                className='img-fluid'
                alt='site-logo'
                width='360'
              />
            </div>
          </div>
        </div>
        <div className='login-panel'>
          <div className='login-content'>
            <div className='tabs-div'>
              <h3 className='text-center title-login'>Login</h3>
              <Form onSubmit={e => onSubmitLogin(e)}>
                <FormGroup className='has-wrapper'>
                  <Input
                    type='email'
                    name='username'
                    id='username'
                    className='has-input input-lg theinputs mb-4'
                    placeholder='Enter Email'
                    required
                  />
                </FormGroup>
                <FormGroup className='has-wrapper'>
                  <Input
                    type='Password'
                    name='password'
                    id='password'
                    className='mb-4'
                    placeholder='Password'
                    required
                    minLength='6'
                  />
                </FormGroup>
                <FormGroup className='mb-15'>
                  <Button
                    type='submit'
                    className='btn-block w-100  p-2'
                    variant='contained'
                    size='large'
                    disabled={loading}
                    color='primary'
                  >
                    {loading ? (
                      <ClipLoader color='white' size='20px' />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminLogin
