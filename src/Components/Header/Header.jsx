import { useState, useRef, useEffect, useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import { useStyles } from './Style.js'
import { getFilmListThunk } from '../../Thunk/getFilmListThunk.js'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

function Header(){
  const throttleSave = useCallback(
    _.throttle(
      (name) => {
        console.log(name)
        dispatch(getFilmListThunk({name: name}))
      }
      , 1000
    ),
		[]
	)

  const classes = useStyles()

  const dispatch = useDispatch()

  const handleChange = e => {
    throttleSave(e.target.value)
  }

  return(
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <InputBase
          onChange={handleChange}
          placeholder="Поиск"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Header
