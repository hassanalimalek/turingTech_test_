import React from 'react'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const PageError = ({ msg, goBackLink }) => {
  const navigate = useNavigate()
  return (
    <div className='m-4 p-4 '>
      <div className='card border-dark rounded-3'>
        <div className='card-body text-center'>
          <h2 className='mb-4'>{msg} </h2>
          <Button
            className='btn-dark'
            onClick={() => {
              navigate(goBackLink)
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PageError
