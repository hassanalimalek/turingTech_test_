import React, { useEffect, useContext } from 'react'
import NotFound from 'pages/404'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AppContext from 'store/app-context'
import Layout from 'components/layout'
import { routeServiceRoute } from 'services/routerService'
import AdminLogin from 'routes/login'
import { Auth } from 'apis/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import jwtService from 'services/jwtService'
import Pusher from 'pusher-js'

function App (props) {
  let navigate = useNavigate()

  const appCtx = useContext(AppContext)

  useEffect(() => {
    // ERROR HERE
    // Unable to authenticate  401 returned
    if (appCtx.userDetail !== false) {
      const pusher = new Pusher('d44e3d910d38a928e0be', {
        cluster: 'eu',
        authEndpoint: 'https://frontend-test-api.aircall.io/pusher/auth'
      })
      console.log('Pusher--->', pusher)
      pusher.connection.bind('error', function (err) {
        console.log('error binding--->', err)
      })
      var channel = pusher.subscribe('private-aircall')
      console.log('channel --->', channel)
    }
  }, [appCtx.userDetail])

  useEffect(() => {
    if (appCtx.userDetail === false && appCtx.loading === false) {
      navigate('/admin/login')
    }
    // Refresh Token aftery every 9 minutes as the token expires after 10 minutes
    let interval = null
    if (appCtx.userDetail !== false && appCtx.loading === false) {
      interval = setInterval(() => {
        let jwt_refresh_token = window.localStorage.getItem('jwt_refresh_token')
        if (jwt_refresh_token) {
          jwtService.signInWithToken(jwt_refresh_token)
        } else {
          clearInterval(interval)
        }
      }, 540000)
    } else {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [appCtx.userDetail, appCtx.loading])

  return (
    <div className='App'>
      <Auth>
        <Routes>
          <Route exact path='/admin/login' element={<AdminLogin />} />
          <Route element={<Layout />}>
            {routeServiceRoute &&
              routeServiceRoute.map((route, key) => (
                <Route
                  exact
                  key={key}
                  path={`/admin/${route.path}`}
                  element={route.component}
                />
              ))}
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Auth>
      <ToastContainer />
    </div>
  )
}

export default App
