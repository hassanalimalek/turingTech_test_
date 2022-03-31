import React, { useEffect, useState } from 'react'
import { getAllCalls } from 'apis/call'
import CallsView from 'components/sections/calls/callsView'
import { Input } from 'reactstrap'

const Call = () => {
  const [loading, setLoading] = useState(false)
  const [calls, setCalls] = useState({ callCount: 0, callNodes: [] })
  const [callViewNodes, setCallViewNodes] = useState([])
  const [variables, setVariables] = useState({ limit: 10, offset: 0 })
  const [filters, setFilters] = useState({})

  const getFilteredValues = (callNodes, filters) => {
    let finalResult = callNodes.filter(callNode => {
      let result = callNode.calls
      if (filters.is_archived) {
        result = result.filter(call => {
          if (filters.is_archived === String(call.is_archived)) {
            return call
          }
          return null
        })
      }
      if (filters.call_type) {
        result = result.filter(call => {
          if (filters.call_type === call.call_type) {
            return call
          }
          return null
        })
      }
      if (result && result.length > 0) {
        callNode.calls = result
        return { ...callNode, calls: result }
      }
      return null
    })
    setCallViewNodes(finalResult)
  }
  const filterChange = (filterType, value) => {
    if (value === 'All') {
      delete filters[filterType]
      setFilters({ ...filters })
    } else {
      setFilters({ ...filters, [filterType]: value })
    }
  }
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      delete variables.pag
      let result = await getAllCalls(variables)
      setLoading(false)
      if (result) {
        setCalls({ callCount: result.count, callNodes: result.calls })
        getFilteredValues(result.calls, filters)
      } else {
        setCallViewNodes([])
        setCalls({ callCount: 0, callNodes: [] })
      }
    })()
  }, [variables])
  useEffect(() => {
    getFilteredValues(calls.callNodes, filters)
  }, [filters])

  return (
    <div className='p-4'>
      <div className='d-flex justify-content-between align-items-start'>
        <h2 className='mb-4 d-inline'>Call Logs</h2>
        <div className='d-flex w-25 '>
          <Input
            type='select'
            className='me-3'
            name='archived'
            onChange={e => {
              filterChange('is_archived', e.target.value)
            }}
          >
            <option value='' selected disabled hidden>
              By Archive
            </option>
            <option value={null}>All</option>
            <option value={true}>Archived</option>
            <option value={false}>Not Archived</option>
          </Input>
          <Input
            type='select'
            name='callType'
            onChange={e => {
              filterChange('call_type', e.target.value)
            }}
          >
            <option value='' selected disabled hidden>
              By call type
            </option>
            <option value={null}>All</option>
            <option value='answered'>Answered</option>
            <option value='missed'>Missed</option>
            <option value='voicemail'>Voice Mail</option>
          </Input>
        </div>
      </div>

      <div>
        <CallsView
          callViewNodes={callViewNodes}
          callCount={calls.callCount}
          loading={loading}
          setVariables={setVariables}
          variables={variables}
        />
      </div>
    </div>
  )
}

export default Call
