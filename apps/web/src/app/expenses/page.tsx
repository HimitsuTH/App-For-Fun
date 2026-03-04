"use client";

import withAuthenticated from "../../hocs/with-auth-hoc";
import { MainContent } from "ui/components/Main";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getExpenses, deleteExpense } from "ui/utils/requests/expense";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ButtonCustom } from "ui/components/ButtonLink";
import { dateToText } from "ui/utils/date.util";
import { useRouter } from "next/navigation";
import { dataGridSx } from "ui/utils/datagrid.sx";
import styled from "styled-components";
import Swal from "sweetalert2";

const PageHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;
const TitleBlock = styled.div``;
const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
`;
const PageSubtitle = styled.p`
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
`;
const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
const TableCard = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;
const TypeBadge = styled.span<{ $type: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${(p) => (p.$type === "INCOME" ? "var(--success)" : "var(--danger)")};
  &::before {
    content: "${(p) => (p.$type === "INCOME" ? "▲" : "▼")}";
    font-size: 0.6rem;
  }
`;
const AmountText = styled.span<{ $type: string }>`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${(p) => (p.$type === "INCOME" ? "var(--success)" : "var(--danger)")};
`;
const CategoryChip = styled.span`
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 600;
`;
const DateText = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;
const LoadingRow = styled.div`
  padding: 3rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
`;

const ActionBtn = styled.button<{ $variant: "edit" | "delete" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-sm);
  border: none;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  font-family: "Kanit", sans-serif;
  background: ${(p) =>
    p.$variant === "edit" ? "var(--primary-light)" : "var(--danger-light)"};
  color: ${(p) => (p.$variant === "edit" ? "var(--primary)" : "var(--danger)")};
  transition: opacity var(--transition);
  &:hover {
    opacity: 0.8;
  }
`;
const ExportBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  font-family: "Kanit", sans-serif;
  cursor: pointer;
  border: 1.5px solid var(--border);
  background: var(--bg-surface);
  color: var(--text-secondary);
  transition: all var(--transition);
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

function Expenses() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => getExpenses(),
  });

  const handleExportCSV = () => {
    const expenses = data?.expenses ?? [];
    if (!expenses.length) return;
    const headers = [
      "วันที่",
      "รายการ",
      "ประเภท",
      "จำนวนเงิน",
      "หมวดหมู่",
      "หมายเหตุ",
    ];
    const rows = expenses.map((e: any) => [
      dateToText(e.created_at, "ab-date"),
      e.name,
      e.type,
      e.amount,
      e.categories?.name ?? "",
      e.description ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((v: any) => `"${String(v).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: number, name: string) => {
    const result = await Swal.fire({
      title: "ลบรายการนี้?",
      text: `"${name}" จะถูกลบและยอดเงินจะถูกปรับ`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // var(--danger) — Swal ไม่รับ CSS vars, cancelButtonColor: '#94a3b8',
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });
    if (result.isConfirmed) {
      const ok = await deleteExpense(id);
      if (ok) queryClient.invalidateQueries({ queryKey: ["expenses"] });
    }
  };

  const columns: GridColDef[] = [
    {
      sortable: false,
      disableColumnMenu: true,
      field: "created_at",
      headerName: "วันที่",
      width: 120,
      renderCell: (p) => (
        <DateText>{dateToText(p.row.created_at, "ab-date")}</DateText>
      ),
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: "name",
      headerName: "รายการ",
      flex: 1,
      minWidth: 140,
      renderCell: (p) => (
        <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>
          {p.row.name}
        </span>
      ),
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: "type",
      headerName: "ประเภท",
      width: 110,
      renderCell: (p) => <TypeBadge $type={p.row.type}>{p.row.type}</TypeBadge>,
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: "amount",
      headerName: "จำนวนเงิน",
      width: 140,
      align: "right",
      headerAlign: "right",
      renderCell: (p) => (
        <AmountText $type={p.row.type}>
          {p.row.type === "INCOME" ? "+" : "-"}
          {Number(p.row.amount).toLocaleString("th-TH", {
            minimumFractionDigits: 2,
          })}
        </AmountText>
      ),
    },
    {
      field: "categories",
      headerName: "หมวดหมู่",
      width: 130,
      renderCell: (p) => (
        <CategoryChip>
          {p.row.categories?.name?.[0]?.toUpperCase() +
            p.row.categories?.name?.slice(1)}
        </CategoryChip>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (p) => (
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <ActionBtn
            $variant="edit"
            onClick={() => router.push(`/expenses/${p.row.id}/edit`)}
          >
            ✏️ แก้ไข
          </ActionBtn>
          <ActionBtn
            $variant="delete"
            onClick={() => handleDelete(p.row.id, p.row.name)}
          >
            🗑 ลบ
          </ActionBtn>
        </div>
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
        <ActionRow>
          <ExportBtn onClick={handleExportCSV}>📥 Export CSV</ExportBtn>
          <ButtonCustom
            title="เพิ่มรายการ"
            href="/expenses/create"
            type="create"
          />
        </ActionRow>
      </PageHeader>
      <TableCard>
        {isLoading ? (
          <LoadingRow>⏳ กำลังโหลดข้อมูล...</LoadingRow>
        ) : (
          <DataGrid
            rows={data?.expenses ?? []}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[10, 25, 50]}
            checkboxSelection={false}
            disableRowSelectionOnClick
            sx={dataGridSx}
          />
        )}
      </TableCard>
    </MainContent>
  );
}

export default withAuthenticated(Expenses);
