"use client"
import withAuthenticated from "../../hocs/with-auth-hoc";
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from "ui/store/hooks";
import { MainContent } from 'ui/components/Main'
import { ButtonCustom } from 'ui/components/ButtonLink'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { getCategory } from "ui/utils/requests/category";
import { useQuery } from "@tanstack/react-query";
import { dateToText } from 'ui/utils/date.util'
import { deleteCategorise } from "ui/utils/requests/category";


const Categorise = () => {
  const dispatch = useAppDispatch();

  // --- Constants for consistent styling ---
  const headerColor = '#b3e5fc'; // Header background (lighter for contrast with dark text)
  const darkText = '#333'; // Dark text color
  // ---------------------------------------

  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ['categorise'],
    queryFn: ()=> getCategory(dispatch)
  })

  if ( isError ) {
    console.log('error')
  }
  
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });
  const [selectedRows, setSelectedRows] = useState([] as any);

  const handleSelectionChange = (selectionModel:any) => {
  // 1. Update the state with the new array of selected IDs (optional, but good practice)
  setRowSelectionModel(selectionModel); 

  console.log('selectionModel-------handleSelectionChange----->',selectionModel)

  // 2. Get the full row objects corresponding to the selected IDs
  //    - data.categories is your original array of all rows.
  //    - We filter this array.
  //    - We check if the 'id' of the current row is IN the selectionModel (the array of IDs).
  const selectedRowsData = data.categories.filter((row:any) => {
    // console.log('row.id--->',row.id)
      return selectionModel.ids.has(row.id)
    }
  );

  // 3. Update the state with the full row objects (including 'type' and other values)
  setSelectedRows(selectedRowsData);

};

  console.log('selectedRowIds---->',rowSelectionModel)
  console.log('selectedRowsselectedRowsselectedRows---->',selectedRows)
  console.log('data?.categories---->',data?.categories)

  const handleRemoveCategory = async () => {
    if (selectedRows.length === 0) {
      return; 
    }
    console.log('handleRemoveCategory======>',rowSelectionModel)
    await deleteCategorise(selectedRows)

    refetch()
    
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
      field: 'categories',
      headerName: 'Category',
      width: 200,
      renderCell: (params) => {
        // Note: textAlign should be applied to the DataGrid-cell if you want to align the whole cell content.
        return <p>{params.row.name[0].toUpperCase() + params.row.name.slice(1)}</p>
      },
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: 'description',
      headerName: 'description',
      width: 120,
      renderCell: (params) => {
        return <p>{params.row.description ? params.row.description : '-' }</p>
      },
    },
  ];


  const selectedCount = rowSelectionModel?.ids?.size || 0;
  const isDisabled = selectedCount === 0;
  
  return (
    <MainContent>
      <div style={{display: 'flex', justifyContent:'flex-end', alignItems:'center'}}>
       <ButtonCustom title="Create" href="/category/create" type={'create'}/>
       <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        // 1. Add the 'disabled' prop and set it based on the selection count
        disabled={isDisabled}
        // 2. Fix the onClick handler: it should be a function call, not a reference
        onClick={handleRemoveCategory}
      >
        Remove ({selectedCount}) Selected
      </Button>
      </div>
  
      
      <DataGrid
        rows={data?.categories || []} // Ensure rows is never null/undefined if data is loaded
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        
        checkboxSelection
        disableRowSelectionOnClick
        disableRowSelectionExcludeModel
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={rowSelectionModel}

        pagination
        
        sx={{
          // 💡 FIX 1: Set background on the root element
          border: 'none', 
          boxShadow: 'none',
          color: darkText, // Ensure default cell text is dark
          
          // 💡 FIX 2: Apply color to the columnHeaders container and inner element
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: `2px solid ${darkText}`,
            fontSize: '0.95rem',
            fontWeight: 'bold',
            color: darkText, // Set text color for headers
          },
          
          // 💡 FIX 3: THE MOST RELIABLE WAY TO COLOR THE ENTIRE HEADER BACKGROUND
          '& .MuiDataGrid-columnHeadersInner': {
             backgroundColor: headerColor, 
          },

          // --- Row and Cell Styles ---
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${headerColor}`, // Use header color as separator
          },
     
        }}
      />
    </MainContent>
  );
};

export default withAuthenticated(Categorise);