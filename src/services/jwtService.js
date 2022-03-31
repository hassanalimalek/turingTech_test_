import axios from 'axios'
// import cryptoJS from 'crypto-js'
// import jwtDecode from 'jwt-decode'
import Utils from './eventemitter'
import Domain from 'helpers/config'

class jwtService extends Utils.EventEmitter {
  init () {
    this.setInterceptors()
    this.handleAuthentication()
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      response => {
        return response
      },
      err => {
        return new Promise((resolve, reject) => {
          console.log('err ---->', err)
          if (
            err.response &&
            err.response.status === 401
            // err.config &&
            // !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token')
            this.setSession(null)
          }
          throw err
        })
      }
    )
  }

  handleAuthentication = () => {
    let access_token = this.getAccessToken()

    if (!access_token) {
      this.emit('onNoAccessToken')
      return
    }

    this.setSession(access_token)
    this.emit('onAutoLogin', true)
  }

  signInAdmin = data => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${Domain}/auth/login`, data)
        .then(response => {
          if (response.data) {
            this.setSession(
              response.data.access_token,
              response.data.refresh_token
            )
            resolve(response.data)
          } else {
            return reject(response)
          }
        })
        .catch(error => {
          console.log('Error --->', error.response)
          return error.response
            ? reject(error.response.data.message)
            : reject('Network Error')
        })
    })
  }

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${Domain}/auth/refresh-token`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.data) {
            this.setSession(response.data.access_token)
            resolve(response.data)
          } else {
            reject(response.data.data.result.error)
          }
        })
        .catch(error => {
          console.log('error --->', error)
          console.log('Error sign in with token -->', error.response)
          reject('Validation Failed')
        })
    })
  }

  setSession = (access_token, refresh_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token)
      if (refresh_token) {
        localStorage.setItem('jwt_refresh_token', refresh_token)
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
    } else {
      localStorage.removeItem('jwt_access_token')
      localStorage.removeItem('jwt_refresh_token')
      delete axios.defaults.headers.common['Authorization']
    }
  }

  logout = () => {
    this.setSession(null)
  }

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token')
  }
}

const instance = new jwtService()

export default instance
