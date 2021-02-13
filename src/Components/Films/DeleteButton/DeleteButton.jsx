import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import { useStyles } from './Styles.js'
import { getFilmListThunk } from '../../../Thunk/getFilmListThunk.js'
import { useDispatch } from 'react-redux'
import api from '../../../Api/api.js'

function DeleteButton(props){
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleClick = async () => {
    try {
      await api.film.delete({_id: props._id})

      dispatch(getFilmListThunk())
    } catch (e) {
        console.log(e)
    }
  }

  return(
    <Button
        onClick={handleClick}
        className={classes.button}
        size="small"
    >
      <DeleteIcon />
    </Button>
  )
}

export default DeleteButton
