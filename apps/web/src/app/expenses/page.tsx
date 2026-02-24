'use client';

import withAuthenticated from "../../hocs/with-auth-hoc";
import { MainContent } from 'ui/components/Main'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getExpenses } from "ui/utils/requests/expense";
import { useQuery } from "@tanstack/react-query";
import { ButtonCustom } from 'ui/components/ButtonLink'
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

const TableCard = styled.div`
  background: var(--bg-surface, #fff);
  border-radius: 16px;
  border: 1px solid var(--border, #e8ecf4);
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  overflow: hidden;
`

/* ─── Type Badge ──────────────────────────── */
const TypeBadge = styled.span<{ $type: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  // background: ${p => p.$type === 'INCOME' ? '#ecfdf5' : '#fef2f2'};
  color: ${p => p.$type === 'INCOME' ? '#059669' : '#dc2626'};

  &::before {
    content: '${p => p.$type === 'INCOME' ? '▲' : '▼'}';
    font-size: 0.6rem;
  }
`

const AmountText = styled.span<{ $type: string }>`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${p => p.$type === 'INCOME' ? '#059669' : '#dc2626'};
`

const CategoryChip = styled.span`
  // padding: 0.2rem 0.6rem;
  // background: var(--primary-light, #eef2ff);
  color: var(--primary, #6366f1);
  // border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`

const DateText = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary, #64748b);
`

const LoadingRow = styled.div`
  padding: 3rem;
  text-align: center;
  color: var(--text-muted, #94a3b8);
  font-size: 0.9rem;
`

function Expenses() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => getExpenses()
  })

  const columns: GridColDef[] = [
    {
      sortable: false,
      disableColumnMenu: true,
      field: 'created_at',
      headerName: 'วันที่',
      width: 130,
      renderCell: (params) => (
        <DateText>{dateToText(params.row.created_at, 'ab-date')}</DateText>
      )
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: 'name',
      headerName: 'รายการ',
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <span style={{ fontWeight: 500, color: 'var(--text-primary, #0f172a)' }}>
          {params.row.name}
        </span>
      )
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: 'type',
      headerName: 'ประเภท',
      width: 120,
      renderCell: (params) => (
        <TypeBadge $type={params.row.type}>{params.row.type}</TypeBadge>
      )
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: 'amount',
      headerName: 'จำนวนเงิน',
      width: 150,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => (
        <AmountText $type={params.row.type}>
          {params.row.type === 'INCOME' ? '+' : '-'}
          {Number(params.row.amount).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
        </AmountText>
      ),
    },
    {
      field: 'categories',
      headerName: 'หมวดหมู่',
      width: 150,
      renderCell: (params) => (
        <CategoryChip>
          {params.row.categories?.name?.[0]?.toUpperCase() + params.row.categories?.name?.slice(1)}
        </CategoryChip>
      ),
    },
  ];

  return (
    <MainContent>
      <PageHeader>
        <TitleBlock>
          <PageTitle>💳 รายรับ-รายจ่าย</PageTitle>
          <PageSubtitle>
            {data?.expenses?.length ?? 0} รายการทั้งหมด
          </PageSubtitle>
        </TitleBlock>
        <ButtonCustom title="เพิ่มรายการ" href="/expenses/create" type="create" />
      </PageHeader>

      <TableCard>
        {isLoading ? (
          <LoadingRow>⏳ กำลังโหลดข้อมูล...</LoadingRow>
        ) : (
          <DataGrid
            rows={data?.expenses ?? []}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50]}
            checkboxSelection={false}
            disableRowSelectionOnClick
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
}

export default withAuthenticated(Expenses)
