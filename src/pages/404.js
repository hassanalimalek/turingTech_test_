import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { BiError } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export default class NotFound extends Component {
  render () {
    return (
      <div className='' key='1'>
        <div className=' text-center mt-4'>
          <BiError style={{ fontSize: '4rem' }} className='my-4' />
          <h2 className='oops my-2'>Oops 404</h2>
          <h2 className='error-msg mb-4'>Sorry, page not found</h2>
          <h4 className='mb-4'>
            {' '}
            Looks like you have navigated too far from Federation Space. Our
            Application <br />
            cannot help you here.
          </h4>
          <Link to='/admin/calls'>
            <Button variant='contained' className='btn-dark btn-lg'>
              Go To Call logs
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}
