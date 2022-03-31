import React, { useState } from 'react'
import { Button, Modal, ModalBody, Label, Input } from 'reactstrap'
import { AiOutlineClose } from 'react-icons/ai'
import { addCallNote } from 'apis/call'
import ClipLoader from 'react-spinners/ClipLoader'

const AddNoteModal = ({ callId, modalState, toggleModal }) => {
  const [loading, setLoading] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault()

    let data = { content: e.target.note.value }
    setLoading(true)
    let result = await addCallNote(callId, data)

    if (result) {
      toggleModal()
    }
    setLoading(false)
  }

  return (
    <div>
      <Modal
        isOpen={modalState}
        toggle={toggleModal}
        className='modal-background'
      >
        <ModalBody>
          <div className='p-4'>
            <div className='d-flex justify-content-end'>
              <AiOutlineClose
                onClick={toggleModal}
                style={{ fontSize: '1.25rem', cursor: 'pointer' }}
              />
            </div>
            <div className='mt-2 form-styles'>
              <h2 className='form-heading d-flex'>Add Note</h2>
              <form onSubmit={e => handleSubmit(e)}>
                <div className='mt-4'>
                  <Label className='d-flex'>Note Description</Label>
                  <Input type='textarea' name='note' required />
                </div>

                <div className='mt-4 d-flex justify-content-end'>
                  <Button
                    type='submit'
                    className=' bg-dark white p-2'
                    variant='contained'
                    size='large'
                    disabled={loading}
                  >
                    {loading ? (
                      <ClipLoader color='white' size='20px' />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AddNoteModal
