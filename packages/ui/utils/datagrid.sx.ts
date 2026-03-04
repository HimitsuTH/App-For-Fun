// Shared MUI DataGrid sx styles — ใช้ CSS tokens แทน hardcode สี
export const dataGridSx = {
  border: 'none',
  fontFamily: "'Kanit', sans-serif",
  '& .MuiDataGrid-columnHeaders': {
    background: 'var(--bg-subtle)',
    borderBottom: '1px solid var(--border)',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-muted)',
  },
  '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700 },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiDataGrid-row:hover': { background: 'var(--primary-light)' },
  '& .MuiDataGrid-row.Mui-selected': { background: 'var(--primary-light) !important' },
  '& .MuiDataGrid-row.Mui-selected:hover': { background: 'var(--primary-glow) !important' },
  '& .MuiCheckbox-root.Mui-checked': { color: 'var(--primary)' },
  '& .MuiDataGrid-row:last-child .MuiDataGrid-cell': { borderBottom: 'none' },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid var(--border)',
    background: 'var(--bg-subtle)',
  },
  '& .MuiDataGrid-selectedRowCount': { display: 'none' },
}
