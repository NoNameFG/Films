import axios from 'axios'

const api = {
  film: {
    add: data => axios.post('/film', data),
    list: data => axios.get('/film/list', {params: {...data}}),
    delete: data => axios.delete('/film', {params: {...data}}),
    get_by_id: data => axios.get('/film', {params: {...data}}),
  }
}

export default api
