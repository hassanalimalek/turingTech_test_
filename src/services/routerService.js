import React from 'react'
import Calls from 'routes/calls'
import CallDetail from 'routes/calls/callDetail'

export const routeServiceRoute = [
  {
    path: 'calls',
    component: <Calls />
  },
  {
    path: 'call/:id',
    component: <CallDetail />
  }
]
