import axios from 'axios'
import Domain from 'helpers/config'
import { toast } from 'react-toastify'
import moment from 'moment'

export async function getAllCalls (variables) {
  return await axios
    .get(`${Domain}/calls`, {
      params: variables
    })
    .then(response => {
      if (response.data.nodes) {
        let calls = response.data.nodes
        let arr = []
        // Sorting the data based on dates
        calls.map(item => {
          let keyCheck = arr.find(x => {
            let check =
              moment(x.created_at).format('YYYY-MM-DD') ===
              moment(item.created_at).format('YYYY-MM-DD')
            return check
          })
          if (keyCheck) {
            keyCheck.calls = [...keyCheck.calls, item].sort((a, b) => {
              if (a.order > b.order) return 1
              if (b.order > a.order) return -1
              return 0
            })
          } else {
            arr.push({
              created_at: item.created_at,
              calls: [item].sort((a, b) => {
                if (a.order > b.order) return 1
                if (b.order > a.order) return -1
                return 0
              })
            })

            // console.log(`arr in else condition >>>>>>>>>>>>>>>>>`, arr);
          }
          arr.sort(
            (a, b) =>
              moment(a.created_at).format('YYYY-MM-DD') -
              moment(b.created_at).format('YYYY-MM-DD')
          )
          return arr
        })
        arr.sort(
          (a, b) =>
            new moment(a.created_at).format('YYYYMMDD') -
            new moment(b.created_at).format('YYYYMMDD')
        )
        return { calls: arr, count: response.data.totalCount }
      }
    })
    .catch(err => {
      console.log('error --->', err.response)
      toast.error(
        err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Something went wrong'
      )
      return false
    })
}

export async function getCallDetail (id) {
  return await axios
    .get(`${Domain}/calls/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log('error --->', err.response.data.message)
      toast.error(
        err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Something went wrong'
      )
      return false
    })
}

export async function archiveCall (id) {
  return await axios
    .put(`${Domain}/calls/${id}/archive`)
    .then(response => {
      toast.success('Call Archive status changed')
      return true
    })
    .catch(err => {
      console.log('error --->', err.response)
      toast.error(
        err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Something went wrong'
      )
      return false
    })
}

export async function addCallNote (id, data) {
  return await axios
    .post(`${Domain}/calls/${id}/note`, data)
    .then(response => {
      toast.success('Note Added Successfully')
      return true
    })
    .catch(err => {
      console.log('error --->', err.response)
      toast.error(
        err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Something went wrong'
      )
      return false
    })
}
