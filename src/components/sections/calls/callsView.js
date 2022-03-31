import React, { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import Pagination from 'react-js-pagination'
import moment from 'moment'
import CallDataCard from './callDataCard'
import { archiveCall } from 'apis/call'

const DesktopView = ({
  callViewNodes,
  callCount,
  loading,
  variables,
  setVariables
}) => {
  const [archiveLoading, setArchiveLoading] = useState(false)
  const [archiveCallId, setArchiveCallId] = useState(false)

  const handlePageChange = pg => {
    pg = pg - 1
    let offsetChange = variables.limit * pg
    setVariables({ ...variables, offset: offsetChange, page: pg + 1 })
  }

  const getCalls = () => {
    return loading === true ? (
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <div
          style={{ minHeight: '40vh' }}
          className='d-flex flex-column justify-content-center'
        >
          <ClipLoader />
        </div>
      </div>
    ) : loading === false && callViewNodes.length === 0 ? (
      <div
        style={{ minHeight: '40vh' }}
        className='d-flex flex-column justify-content-center text-center mt-6'
      >
        <h4 className='fw-bold'>No Calls</h4>
      </div>
    ) : (
      callViewNodes.map(callNode => {
        return (
          <div className='mb-4'>
            <h4>
              {moment(callNode.created_at)
                .local()
                .format('Do MMMM, YYYY')}
            </h4>
            <div className='row'>
              {callNode.calls.map(call => {
                return (
                  <CallDataCard
                    call={call}
                    archive={archive}
                    archiveLoading={archiveLoading}
                    archiveCallId={archiveCallId}
                  />
                )
              })}
            </div>
          </div>
        )
      })
    )
  }

  const archive = async id => {
    console.log('Archive Call --->', id)
    setArchiveLoading(true)
    setArchiveCallId(id)
    await archiveCall(id)
    setArchiveLoading(false)
  }

  return (
    <div>
      <div className='row'>{getCalls()}</div>
      {callCount > 0 && (
        <div className='my-4 d-flex justify-content-center'>
          <Pagination
            activePage={variables.page}
            // itemsCountPerPage={10}
            totalItemsCount={callCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass='page-item'
            linkClass='page-link'
            activeLinkClass='active-pagination-item'
          />
        </div>
      )}
    </div>
  )
}

export default DesktopView
