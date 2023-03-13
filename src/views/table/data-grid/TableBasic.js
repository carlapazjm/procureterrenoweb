// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'


const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: 'ID'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'full_name',
    headerName: 'Name'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'email',
    headerName: 'Email'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'start_date',
    headerName: 'Date'
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'experience',
    headerName: 'Title'
  },
  {
    flex: 0.1,
    field: 'age',
    minWidth: 80,
    headerName: 'Age'
  }
]

const TableBasic = (rows) => {
  return (
    <Card>
      <CardHeader title='Basic' />
      <Box sx={{ height: 500 }}>
        <DataGrid columns={columns} rows={rows} />
      </Box>
    </Card>
  )
}

export default TableBasic
