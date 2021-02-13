import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import shortid from 'shortid'

function FilmsList(props){
  const rows = props.rows.map( el => (
    <TableRow key={shortid.generate()}>
      <TableCell component="th" scope="row">
        {el.title}
      </TableCell>
      <TableCell align="right">{el.release_year}</TableCell>
      <TableCell align="right">{el.format}</TableCell>
      <TableCell align="right">{el.stars}</TableCell>
    </TableRow>
  ))

  return(
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Release Year</TableCell>
            <TableCell align="right">Format</TableCell>
            <TableCell align="right">Stars</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FilmsList
