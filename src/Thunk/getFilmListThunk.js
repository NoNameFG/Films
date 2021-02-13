import api from '../Api/api.js'
import { getFilmList } from '../Actions/getFilmList.js'

export const getFilmListThunk = (data = {}) => {
  return (dispatch) => {
    return api.film.list(data).then(
      films => dispatch(getFilmList(films.data))
    )
  }
}
