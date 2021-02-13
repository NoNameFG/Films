import Header from './Components/Header/Header.jsx'
import './App.css'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import Films from './Components/Films/Films.jsx'
import AddFilms from './Components/AddFilms/AddFilms.jsx'
import { useStyles } from './Style.js'
import { useState } from 'react'


function App() {
  const classes = useStyles()
  const [addDialogStatus, setAddDialogStatus] = useState(false)

  return (
    <div className="App">
      <Header/>

      <Films/>

      <AddFilms
        addDialogStatus={addDialogStatus}
        setAddDialogStatus={setAddDialogStatus}
      />

      <Tooltip title="Добавить фильм" aria-label="add film">
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => setAddDialogStatus(true)}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}

export default App
