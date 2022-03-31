import React, { useEffect, useState, useContext } from 'react'
import jwtService from 'services/jwtService'
import AppContext from 'store/app-context'

const Auth = props => {
  const appCtx = useContext(AppContext)
  const [waitAuthCheck, setWaitAuthCheck] = useState(true)

  useEffect(() => {
    return Promise.all([jwtCheck()]).then(() => {
      setWaitAuthCheck(false)
    })
  }, [])
  let jwtCheck = () =>
    new Promise(resolve => {
      jwtService.on('onAutoLogin', () => {
        jwtService
          .signInWithToken()
          .then(result => {
            appCtx.setUserData(result.user)
            appCtx.setAppLoading(false)
            resolve()
          })
          .catch(error => {
            resolve()
            appCtx.setUserData(false)
            appCtx.setAppLoading(false)
          })
      })

      jwtService.on('onAutoLogout', message => {
        appCtx.setUserData(false)
        appCtx.setAppLoading(false)
        resolve()
      })

      jwtService.on('onNoAccessToken', () => {
        resolve()
        appCtx.setUserData(false)
        appCtx.setAppLoading(false)
      })

      jwtService.init()

      return Promise.resolve()
    })

  return (
    <>{waitAuthCheck ? '' : <React.Fragment children={props.children} />}</>
  )
}

export default Auth
