"use client"
import withAuthenticated from "../../hocs/with-auth-hoc";
import { useState } from 'react'
import { useAppDispatch } from "ui/store/hooks";
import { MainContent } from 'ui/components/Main'
import { ButtonCustom } from 'ui/components/ButtonLink'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { getCategory, deleteCategorise } from "ui/utils/requests/category";
import { useQuery } from "@tanstack/react-query";
import { dateToText } from 'ui/utils/date.util'
import styled from "styled-components";

/* ─── Layout ──────────────────────────────── */
const PageHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`
const TitleBlock = styled.div``
const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  letter-spacing: -0.02em;
`
const PageSubtitle = styled.p`
  font-size: 0.82rem;
  color: var(--text-muted, #94a3b8);
  margin-top: 0.2rem;
`
const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const TableCard = styled.div`
  background: var(--bg-surface, #fff);
  border-radius: 16px;
  border: 1px solid var(--border, #e8ecf4);
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  overflow: hidden;
`

const DeleteBtn = styled.button<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Kanit', sans-serif;
  cursor: ${p => p.$disabled ? 'not-allowed' : 'pointer'};
  border: 1.5px solid ${p => p.$disabled ? '#e8ecf4' : 'rgba(239,68,68,0.3)'};
  background: ${p => p.$disabled ? '#f8fafc' : '#fef2f2'};
  color: ${p => p.$disabled ? '#cbd5e1' : '#dc2626'};
  transition: all 0.2s ease;

  &:hover:not([disabled]) {
    background: #ef4444;
    color: white;
    border-color: #ef4444;
  }
`

const SelectionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 20px;
  background: #ef4444;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
`

const DateText = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary, #64748b);
`

const NameText = styled.span`
  font-weight: 600;
  color: var(--text-primary, #0f172a);
`

const DescText = styled.span`
  font-size: 0.82rem;
  color: var(--text-secondary, #64748b);
`

const LoadingRow = styled.div`
  padding: 3rem;
  text-align: center;
  color: var(--text-muted, #94a3b8);
  font-size: 0.9rem;
`

const Categorise = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ['categorise'],
    queryFn: () => getCategory(dispatch)
  })

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>(
    { type: 'include', ids: new Set() }
  );

  const handleSelectionChange = (selectionModel: any) => {
    setRowSelectionModel(selectionModel);
  };

  // คำนวณ selectedRows จาก rowSelectionModel + data ตลอดเวลา (ไม่ใช้ stale state)
  const allCategories = data?.categories ?? [];
  const selectedRows = (() => {
    const model = rowSelectionModel as any;
    if (!model) return [];
    if (model.type === 'exclude') {
      // "Select All" กด → exclude คือยกเว้น ids ที่ระบุ
      return allCategories.filter((row: any) => !model.ids.has(row.id));
    }
    // include = เลือกเฉพาะ ids ที่ระบุ
    return allCategories.filter((row: any) => model.ids.has(row.id));
  })();

  const handleRemoveCategory = async () => {
    if (selectedRows.length === 0) return;
    await deleteCategorise(selectedRows);
    // reset selection หลังลบ
    setRowSelectionModel({ type: 'include', ids: new Set() });
    refetch();
  }

  const selectedCount = selectedRows.length;

  const columns: GridColDef[] = [
    {
      sortable: false,
      disableColumnMenu: true,
      field: 'created_at',
      headerName: 'วันที่สร้าง',
      width: 130,
      renderCell: (params) => (
        <DateText>{dateToText(params.row.created_at, 'ab-date')}</DateText>
      )
    },
    {
      field: 'categories',
      headerName: 'ชื่อหมวดหมู่',
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <NameText>
          {params.row.name?.[0]?.toUpperCase() + params.row.name?.slice(1)}
        </NameText>
      ),
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: 'description',
      headerName: 'คำอธิบาย',
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <DescText>{params.row.description || '—'}</DescText>
      ),
    },
  ];

  return (
    <MainContent>
      <PageHeader>
        <TitleBlock>
          <PageTitle>🗂️ หมวดหมู่</PageTitle>
          <PageSubtitle>
            {data?.categories?.length ?? 0} หมวดหมู่ทั้งหมด
          </PageSubtitle>
        </TitleBlock>
        <ActionRow>
          <DeleteBtn
            $disabled={selectedCount === 0}
            disabled={selectedCount === 0}
            onClick={handleRemoveCategory}
          >
            🗑 ลบ
            {selectedCount > 0 && <SelectionBadge>{selectedCount}</SelectionBadge>}
          </DeleteBtn>
          <ButtonCustom title="เพิ่มหมวดหมู่" href="/category/create" type="create" />
        </ActionRow>
      </PageHeader>

      <TableCard>
        {isLoading ? (
          <LoadingRow>⏳ กำลังโหลดข้อมูล...</LoadingRow>
        ) : (
          <DataGrid
            rows={data?.categories ?? []}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleSelectionChange}
            rowSelectionModel={rowSelectionModel}
            sx={{
              border: 'none',
              fontFamily: "'Kanit', sans-serif",
              '& .MuiDataGrid-columnHeaders': {
                background: '#f8fafc',
                borderBottom: '1px solid #e8ecf4',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#94a3b8',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 700,
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiDataGrid-row:hover': {
                background: '#f8f9ff',
              },
              '& .MuiDataGrid-row.Mui-selected': {
                background: '#eef2ff !important',
              },
              '& .MuiDataGrid-row.Mui-selected:hover': {
                background: '#e0e7ff !important',
              },
              '& .MuiCheckbox-root.Mui-checked': {
                color: 'var(--primary, #6366f1)',
              },
              '& .MuiDataGrid-row:last-child .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid #e8ecf4',
                background: '#fafbfc',
              },
              '& .MuiDataGrid-selectedRowCount': {
                display: 'none',
              },
            }}
          />
        )}
      </TableCard>
    </MainContent>
  );
};

export default withAuthenticated(Categorise);
