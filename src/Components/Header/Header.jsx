import { useState, useRef, useEffect, useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useStyles } from './Style.js'
import { getFilmListThunk } from '../../Thunk/getFilmListThunk.js'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

function Header(){
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchString, setSearchString] = useState('')
  const [searchCategory, setSearchCategory] = useState('Название фильма')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleItemClick = (event, category) => {
    setSearchCategory(category)
    setAnchorEl(null)
    if(searchString){
      let data = {}
      if(category === 'Название фильма') data.filmTitle = searchString
      if(category === 'Имя актёра') data.actorName = searchString
      dispatch(getFilmListThunk(data))
    }
  }

  const throttleSave = useCallback(
    _.throttle(
      (name, category) => {
        let data = {}
        if(category === 'Название фильма') data.filmTitle = name
        if(category === 'Имя актёра') data.actorName = name
        dispatch(getFilmListThunk(data))
      }
      , 1000
    ),
		[]
	)

  const classes = useStyles()

  const dispatch = useDispatch()

  const handleChange = e => {
    throttleSave(e.target.value, searchCategory)
    setSearchString(e.target.value)
  }

  return(
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <div className={classes.search}>
          <InputBase
            onChange={handleChange}
            placeholder="Поиск"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
          <Button
            aria-controls="category-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.menuButton}
          >
            {searchCategory}
          </Button>
          <Menu
            id="category-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={(event) => handleItemClick(event, 'Название фильма')}
            >
              Название фильма
            </MenuItem>
            <MenuItem
              onClick={(event) => handleItemClick(event, 'Имя актёра')}
            >
              Имя актёра
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
