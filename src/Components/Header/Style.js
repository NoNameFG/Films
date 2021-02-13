import { makeStyles, fade } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    padding: '0 10px'
  },
  inputInput:{
    width: '35vw'
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'center'
  }
}))
