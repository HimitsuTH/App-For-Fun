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
import { dataGridSx } from 'ui/utils/datagrid.sx'
import styled from "styled-components";

const PageHeader = styled.div`
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;
`
const TitleBlock = styled.div``
const PageTitle = styled.h1`font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em;`
const PageSubtitle = styled.p`font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;`
const ActionRow = styled.div`display: flex; align-items: center; gap: 0.75rem;`
const TableCard = styled.div`
  background: var(--bg-surface); border-radius: var(--radius-lg);
  border: 1px solid var(--border); box-shadow: var(--shadow-sm); overflow: hidden;
`
const DeleteBtn = styled.button<{ $disabled: boolean }>`
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.55rem 1.1rem; border-radius: var(--radius-sm);
  font-size: 0.875rem; font-weight: 600; font-family: 'Kanit', sans-serif;
  cursor: ${p => p.$disabled ? 'not-allowed' : 'pointer'};
  border: 1.5px solid ${p => p.$disabled ? 'var(--border)' : 'rgba(239,68,68,0.3)'};
  background: ${p => p.$disabled ? 'var(--bg-subtle)' : 'var(--danger-light)'};
  color: ${p => p.$disabled ? 'var(--text-disabled)' : 'var(--danger)'};
  transition: all var(--transition);
  &:hover:not([disabled]) { background: var(--danger); color: white; border-color: var(--danger); }
`
const SelectionBadge = styled.span`
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 20px; padding: 0 5px; border-radius: 20px;
  background: var(--danger); color: white; font-size: 0.65rem; font-weight: 700;
`
const DateText = styled.span`font-size: 0.8rem; color: var(--text-secondary);`
const NameText = styled.span`font-weight: 600; color: var(--text-primary);`
const DescText = styled.span`font-size: 0.82rem; color: var(--text-secondary);`
const LoadingRow = styled.div`padding: 3rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;`

const Categorise = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data, refetch } = useQuery({ queryKey: ['categorise'], queryFn: () => getCategory(dispatch) })
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });

  const allCategories = data?.categories ?? [];
  const selectedRows = (() => {
    const model = rowSelectionModel as any;
    if (!model) return [];
    if (model.type === 'exclude') return allCategories.filter((row: any) => !model.ids.has(row.id));
    return allCategories.filter((row: any) => model.ids.has(row.id));
  })();

  const handleRemoveCategory = async () => {
    if (selectedRows.length === 0) return;
    await deleteCategorise(selectedRows);
    setRowSelectionModel({ type: 'include', ids: new Set() });
    refetch();
  }

  const columns: GridColDef[] = [
    { sortable: false, disableColumnMenu: true, field: 'created_at', headerName: 'วันที่สร้าง', width: 130,
      renderCell: (p) => <DateText>{dateToText(p.row.created_at, 'ab-date')}</DateText> },
    { field: 'categories', headerName: 'ชื่อหมวดหมู่', flex: 1, minWidth: 160,
      renderCell: (p) => <NameText>{p.row.name?.[0]?.toUpperCase() + p.row.name?.slice(1)}</NameText> },
    { sortable: false, disableColumnMenu: true, field: 'description', headerName: 'คำอธิบาย', flex: 1, minWidth: 160,
      renderCell: (p) => <DescText>{p.row.description || '—'}</DescText> },
  ];

  return (
    <MainContent>
      <PageHeader>
        <TitleBlock>
          <PageTitle>🗂️ หมวดหมู่</PageTitle>
          <PageSubtitle>{data?.categories?.length ?? 0} หมวดหมู่ทั้งหมด</PageSubtitle>
        </TitleBlock>
        <ActionRow>
          <DeleteBtn $disabled={selectedRows.length === 0} disabled={selectedRows.length === 0} onClick={handleRemoveCategory}>
            🗑 ลบ {selectedRows.length > 0 && <SelectionBadge>{selectedRows.length}</SelectionBadge>}
          </DeleteBtn>
          <ButtonCustom title="เพิ่มหมวดหมู่" href="/category/create" type="create" />
        </ActionRow>
      </PageHeader>
      <TableCard>
        {isLoading ? <LoadingRow>⏳ กำลังโหลดข้อมูล...</LoadingRow> : (
          <DataGrid rows={data?.categories ?? []} columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[10, 25, 50]} checkboxSelection disableRowSelectionOnClick
            onRowSelectionModelChange={setRowSelectionModel} rowSelectionModel={rowSelectionModel}
            sx={dataGridSx} />
        )}
      </TableCard>
    </MainContent>
  );
};

export default withAuthenticated(Categorise);
