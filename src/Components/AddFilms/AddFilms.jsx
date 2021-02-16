import { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './AddFilms.css'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { useStyles } from './Style.js'
import { txtToJSON } from '../../Functions/txtToJSON.js'
import FilmsList from './FilmsList/FilmsList.jsx'
import api from '../../Api/api.js'
import { getFilmListThunk } from '../../Thunk/getFilmListThunk.js'
import { useDispatch } from 'react-redux'



function AddFilms(props){
  const [snackBarStatus, setSnackBarStatus] = useState({
    error: false,
    success: false
  })
  const [filmData, setFilmData] = useState({
    title: '',
    release_year: '',
    stars: '',
    format: ''
  })
  const [fileData, setFileData] = useState(null)
  const [filmsListData, setFilmsListData] = useState([])

  const classes = useStyles()

  const dispatch = useDispatch()

  const handleChange = e => {
    setFilmData({
      ...filmData,
      [e.target.name]: e.target.value
    })
  }

  const clearState = () => {
    setFilmData({
      title: '',
      release_year: '',
      stars: '',
      format: ''
    })
    setFilmsListData([])
  }

  const snackBarChange = (success = false, error = false) => {
    setSnackBarStatus({
      error,
      success
    })
  }

  const closePopup = () => {
    clearState()
    props.setAddDialogStatus(false)
  }

  const imageUpload = e => {
    const file = e.target.files[0]
    if(file){
      setFileData(e.target.files[0])

      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = event => {
        setFilmsListData(txtToJSON(event.target.result))
      }
    }
    e.target.value = ''
  }

  const handleAddFilms = async () => {
    try {

      let sendData

      if(filmsListData.length){
        let send = new FormData()
        send.append('file', fileData)
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        sendData = {
          data: send,
          config
        }
        console.log(sendData)
      } else {
        sendData = {
          data: [filmData],
          config: {}
        }
      }

      await api.film.add(sendData)

      dispatch(getFilmListThunk())

      snackBarChange(true)

      closePopup()

    } catch (e) {
      snackBarChange(false ,true)
    }
  }

  return(
    <>
      <Dialog
        aria-labelledby="dialog-title"
        onClose={closePopup}
        open={props.addDialogStatus}
        maxWidth="md"
      >
        <div className="add_film">
          <DialogTitle id="dialog-title">Добавление фильмов</DialogTitle>

          {
            filmsListData.length ?
            <FilmsList rows={filmsListData}/>
            :
            <>
              <TextField
                onChange={handleChange}
                className={classes.inputText}
                label="Название фильма"
                name="title"
                variant="outlined"
                autoComplete="off"
                value={filmData.title}
              />

              <TextField
                onChange={handleChange}
                className={classes.inputText}
                label="Год выпуска"
                name="release_year"
                variant="outlined"
                autoComplete="off"
                value={filmData.release_year}
              />

              <TextField
                onChange={handleChange}
                className={classes.inputText}
                label="Список актёров"
                name="stars"
                variant="outlined"
                autoComplete="off"
                value={filmData.stars}
              />

              <FormControl variant="filled" className={classes.inputText}>
                <InputLabel
                  id="format_select"
                >
                  Формат выпуска
                </InputLabel>
                <Select
                  labelId="format_select"
                  value={filmData.format}
                  onChange={handleChange}
                  label="format"
                  name="format"
                >
                  <MenuItem value="DVD">DVD</MenuItem>
                  <MenuItem value="VHS">VHS</MenuItem>
                  <MenuItem value="Blu-Ray">Blu-Ray</MenuItem>
                </Select>
              </FormControl>
            </>
        }

          <div className="add_film--buttons">
            {
              filmsListData.length ?
              <Button
                onClick={() => setFilmsListData([])}
                variant="contained"
              >
                Очистить список
              </Button>
              :
              <Button variant="contained" component="label" type="file">
                <input type="file" hidden accept=".txt" onChange={imageUpload}/>
                Добавить файл .txt
              </Button>
            }


            <div className="add_film--buttons_controll">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddFilms()}
              >
                Добавить
              </Button>

              <Button
                variant="contained"
                onClick={closePopup}
              >
                Отменить
              </Button>
            </div>

          </div>

        </div>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackBarStatus.success}
        onClose={() => snackBarChange()}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => snackBarChange()}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Фильмы добавлен успешно.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackBarStatus.error}
        onClose={() => snackBarChange()}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => snackBarChange()}
          severity="error"
          elevation={6}
          variant="filled"
        >
          Ошибка добавления фильмов.
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddFilms
