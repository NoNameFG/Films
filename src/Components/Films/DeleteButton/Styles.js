import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  button: {
    maxWidth: 30,
    maxHeight: 30,
    minWidth: 30,
    minHeight: 30,
    padding: 6,
    display: "flex",
    justifyContent: 'center'
  }
}))
