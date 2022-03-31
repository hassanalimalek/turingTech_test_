// import axios from 'axios'
// import Domain from 'helpers/config'
// import { toast } from 'react-toastify'

// export async function userLoginApi (data) {
//   console.log('Get All Categories Called  @@@@')
//   return await axios
//     .post(`${Domain}/auth/login`, data, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => {
//       console.log('Response @@@@ --->', response.data)
//       console.log('respone --->', response)
//       // let data = console.log('data login response--->', data)
//       // toast.success('Profile created successfuly')
//       return response.data
//     })
//     .catch(err => {
//       console.log('Error --->', err)
//       console.log('error --->', err.response.data.message)
//       toast.error(
//         err.response.data && err.response.data.message
//           ? err.response.data.message
//           : 'Something went wrong'
//       )
//       return false
//     })
// }

// export async function signWithTokenApi (token) {
//   console.log('sign in with token Called  @@@@', token)
//   return await axios
//     .post(`${Domain}/auth/refresh-token`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       console.log('Response @@@@ --->', response.data)
//       console.log('respone --->', response)
//       // let data = console.log('data login response--->', data)
//       // toast.success('Profile created successfuly')
//       return response.data
//     })
//     .catch(err => {
//       console.log('Error --->', err)
//       console.log('error --->', err.response.data.message)
//       toast.error(
//         err.response.data && err.response.data.message
//           ? err.response.data.message
//           : 'Something went wrong'
//       )
//       return false
//     })
// }
