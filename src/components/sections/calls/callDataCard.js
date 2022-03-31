import React from 'react'
import { BsTelephoneOutbound, BsTelephoneInbound } from 'react-icons/bs'
import { FiPhoneMissed, FiPhoneCall, FiVoicemail } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'

const CallDataCard = ({ call, archive, archiveCallId, archiveLoading }) => {
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
  return (
    <div className='col-12 col-sm-6  col-lg-4 col-xl-3 '>
      <div className='card text-start mb-4 item_card shadow-sm rounded-3 '>
        <div className='card-body p-2'>
          <div className='d-flex justify-content-between '>
            <div className='mb-2'>
              <div className=''>
                <p class='card-text me-4'>
                  <small class=''>From : {call.from}</small>
                </p>
                <p class='card-text me-4'>
                  <small class=''>To : {call.to}</small>
                </p>
              </div>
            </div>
            <div className='d-flex justify-content-between'>
              <div>
                <div className='d-flex'>
                  <p class='card-text me-4'>Direction</p>
                  <div>
                    {call.direction === 'inbound' ? (
                      <BsTelephoneInbound style={{ fontSize: '1.5rem' }} />
                    ) : (
                      <BsTelephoneOutbound style={{ fontSize: '1.5rem' }} />
                    )}
                  </div>
                </div>
                <div className='d-flex'>
                  <p class='card-text me-4'>Call Type</p>
                  <div>{getCallTypeIcon[call.call_type]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <div>
              <p class='card-text me-2'>
                Duration : {getCallDuration(call.duration)}
              </p>
              <p class='card-text me-2'>
                Archived : {call.is_archived ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <Link
                to={`/admin/call/${call.id}`}
                style={{ textDecoration: 'none' }}
              >
                <p
                  class='card-text  border border-dark'
                  style={{ cursor: 'pointer' }}
                  className='text-primary'
                >
                  View Details
                </p>
              </Link>
              <p
                className='text-primary '
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  archive(call.id)
                }}
              >
                {archiveCallId === call.id && archiveLoading ? (
                  <ClipLoader size={16} speedMultiplier={0.5} />
                ) : (
                  'Archive Call'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallDataCard
