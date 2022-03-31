import React, { useState, useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { BsTelephoneOutbound, BsTelephoneInbound } from 'react-icons/bs'
import { FiPhoneMissed, FiPhoneCall, FiVoicemail } from 'react-icons/fi'
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import { Button } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { getCallDetail } from 'apis/call'
import AddNoteModal from 'components/modals/addNoteModal'
import PageError from 'components/common/pageError'
import moment from 'moment'

const CallDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [callDetail, setCallDetail] = useState({})
  const [noteModalState, setModalState] = useState(false)

  const getCallTypeIcon = {
    missed: <FiPhoneMissed color='red' style={{ fontSize: '1.5rem' }} />,
    answered: <FiPhoneCall color='green' style={{ fontSize: '1.5rem' }} />,
    voicemail: <FiVoicemail style={{ fontSize: '1.5rem' }} />
  }
  const getCallDuration = duration => {
    let d = Number(duration)
    var h = Math.floor(d / 3600)
    var m = Math.floor((d % 3600) / 60)
    var s = Math.floor((d % 3600) % 60)
    var hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : ''
    var mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : ''
    var sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
    return <span className='fw-normal'>{hDisplay + mDisplay + sDisplay}</span>
  }
  const getNotes = () => {
    if (callDetail) {
      return (
        callDetail.notes &&
        callDetail.notes.map(note => {
          return (
            <div className='mb-3 card-body border border-dark rounded-3'>
              <p>{note.content}</p>
            </div>
          )
        })
      )
    }
  }
  useEffect(() => {
    if (id) {
      ;(async () => {
        setLoading(true)
        let result = await getCallDetail(id)
        setLoading(false)
        if (result) {
          setCallDetail(result)
        } else {
          setCallDetail({ error: true })
        }
      })()
    }
  }, [])
  if (callDetail && callDetail.error) {
    return <PageError msg='Something went wrong' goBackLink='/admin/calls' />
  }
  return (
    <div>
      <div className='m-4 p-4 '>
        <div className='card shadow rounded-3'>
          <div className='card-body'>
            {loading ? (
              <div className=' text-center'>
                <ClipLoader />
              </div>
            ) : (
              <div>
                <BsArrowLeftCircleFill
                  style={{ fontSize: '2rem', cursor: 'pointer' }}
                  className='mb-4'
                  onClick={() => {
                    navigate('/admin/calls')
                  }}
                />
                <h1 className='mb-4'> Call Details</h1>
                <h4 className='mb-3'>
                  From : <span className='fw-normal'>{callDetail.from}</span>
                </h4>
                <h4 className='mb-3'>
                  To : <span className='fw-normal'>{callDetail.to}</span>{' '}
                </h4>
                <h4 className='mb-3'>
                  Via : <span className='fw-normal'>{callDetail.via}</span>
                </h4>
                <h4 className='mb-3'>
                  Direction :{' '}
                  {callDetail.direction === 'inbound' ? (
                    <span>
                      <BsTelephoneInbound
                        style={{ fontSize: '1.5rem' }}
                        className='mx-2'
                      />{' '}
                      <span className='fw-normal'>Incoming</span>
                    </span>
                  ) : (
                    <BsTelephoneOutbound style={{ fontSize: '1.5rem' }} />
                  )}
                </h4>
                <h4 className='mb-3'>
                  Type : {getCallTypeIcon[callDetail.call_type]}
                  <span className='mx-2 fw-light'>{callDetail.call_type}</span>
                </h4>
                <h4 className='mb-3'>
                  Duration : {getCallDuration(callDetail.duration)}
                </h4>
                <h4 className='mb-3'>
                  Archived :{' '}
                  <span className='fw-normal'>
                    {' '}
                    {callDetail.is_archived ? 'Yes' : 'No'}
                  </span>
                </h4>
                <h4 className='mb-4'>
                  Call Date :
                  <span className='fw-normal'>
                    {' '}
                    {moment(callDetail.createdAt).format('LL')}
                  </span>
                </h4>

                <div className='pt-4'>
                  <div className='d-flex justify-content-between mb-4'>
                    <h3>Notes</h3>
                    <Button
                      className='btn btn-dark'
                      onClick={() => {
                        setModalState(true)
                      }}
                    >
                      Add Note
                    </Button>
                  </div>
                  <div className='card-body '>{getNotes()}</div>
                </div>
              </div>
            )}
          </div>
          <AddNoteModal
            callId={id}
            modalState={noteModalState}
            toggleModal={() => {
              setModalState(!noteModalState)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CallDetail
