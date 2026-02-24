'use client';

import withAuthenticated from "../../hocs/with-auth-hoc";
// import { useAppDispatch } from "ui/store/hooks";

import { MainContent } from 'ui/components/Main'

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { getExpenses } from "ui/utils/requests/expense";
import { useQuery } from "@tanstack/react-query";

import { ButtonCustom } from 'ui/components/ButtonLink'
import { dateToText } from 'ui/utils/date.util'

function Expenses() {

  const { isLoading, data, isError } = useQuery({
    queryKey: ['expenses'],
    queryFn: ()=> getExpenses()
  })

  if ( isError ) {
    console.log('error')
  }


  const columns: GridColDef[] = [
  { 
    sortable: false,
    disableColumnMenu: true,
    field: 'created_at', 
    headerName: 'Created At', 
    width: 150,
    renderCell: (params) => {
      return <p>{dateToText(params.row.created_at , 'ab-date')}</p>
    }
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'name',
    headerName: 'Name',
    width: 200,
    editable: true,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'type',
    headerName: 'Type',
    width: 120,
    editable: true,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 200,
    editable: true,
    renderCell: (params) => {
      return <p style={ params.row.type === 'INCOME' ? { color: 'green' } : { color : 'red' }}>{params.row.amount}</p>
    },
  },
  {
    field: 'categories',
    headerName: 'Category',
    width: 200,
    renderCell: (params) => {
      return <p style={{textAlign: 'center'}}>{params.row.categories.name[0].toUpperCase() + params.row.categories.name.slice(1)}</p>
    },
  },
];

  console.log('-------Expenses Home ----->',data)

  return (
    <MainContent>
      <ButtonCustom title="Create" href="/expenses/create" type={'create'}/>
      <main>
      <DataGrid
        rows={data?.expenses}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        sx={{
          boxShadow: 'none',

          // 💡 HEADER STYLES WITH COLOR
          '$ .MuiDataGrid-topContainer' : {
            backgroundColor: '#0000'
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '2px solid #1976d2',
            fontSize: '0.95rem',
            fontWeight: 'bold',
          },
          // --- (Rest of the clean styles from before) ---
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #eee',
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#fff',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#fafafa',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#eaf6ff',
            transition: 'background-color 0.2s',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #ddd',
            backgroundColor: '#f9f9f9',
          },
        }}
      />
      </main>

    </MainContent>
  );
}

export default withAuthenticated(Expenses)
