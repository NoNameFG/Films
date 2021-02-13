import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link'
import { getFilmListThunk } from '../../Thunk/getFilmListThunk.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import DeleteButton from './DeleteButton/DeleteButton.jsx'
import FilmToolTip from './Preview/FilmToolTip.jsx'

const columns = [
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    renderCell: (params) => {
      const handleClick = e => e.preventDefault()

      return(
        <Tooltip title={<FilmToolTip _id={params.row._id}/>}>
          <Link href="#" onClick={handleClick}>
            {params.row.title}
          </Link>
        </Tooltip>
      )
    }
  },
  { field: 'release_year', headerName: 'Release year', width: 150 },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 120,
    sortable: false,
    renderCell: (params) => {
      return(
        <DeleteButton _id={params.row._id}/>
      )
    }
  }
];

function Films(){
  const dispatch = useDispatch()

  const films = useSelector(state => state.filmList)

  useEffect(() => {
    dispatch(getFilmListThunk())
  }, [])

  const exactArr = films.map(el => ({
    ...el,
    id: el._id
  }))

  return(
    <>
      <DataGrid
        columns={columns}
        rows={exactArr}
        pageSize={15}
        disableColumnMenu
      />
    </>
  )
}

export default Films
