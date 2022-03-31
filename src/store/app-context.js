import { createContext, useState } from 'react'
const AppContext = createContext({
  userDetail: Boolean,
  setUserData: function (data) {},
  setAppLoading: function (value) {},
  loading: Boolean
})

export function AppContextProvider (props) {
  const [userDetail, setUserDetail] = useState(false)
  const [loading, setLoading] = useState(true)

  const setUserData = data => {
    setUserDetail(data)
  }
  const setAppLoading = value => {
    setLoading(value)
  }

  const context = {
    userDetail: userDetail,
    setUserData: setUserData,
    setAppLoading: setAppLoading,
    loading: loading
  }
  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  )
}

export default AppContext
