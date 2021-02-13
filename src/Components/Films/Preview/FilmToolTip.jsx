import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import api from '../../../Api/api.js'

function FilmToolTip(props){
  const [film, setFilm] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await api.film.get_by_id({_id: props._id})
        setFilm(data.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [props._id])

  return(
    <>
      <Typography variant="h6">
        {film.title}
      </Typography>

      <Typography>
        Release year: {film.release_year}
      </Typography>

      <Typography>
        Format: {film.format}
      </Typography>

      <Typography>
        Stars: {film.stars}
      </Typography>
    </>
  )
}

export default FilmToolTip
