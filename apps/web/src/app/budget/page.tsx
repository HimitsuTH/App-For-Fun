'use client'

import withAuthenticated from "../../hocs/with-auth-hoc"
import { MainContent } from 'ui/components/Main'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import styled from "styled-components"

const fetchBudgets = async () => {
  const res = await axios.get('/api/categories/budget', { withCredentials: true })
  return res.data.budgets
}
const saveBudget = async (id: number, budget_limit: number | null) => {
  await axios.put(`/api/categories/${id}/budget`, { budget_limit }, { withCredentials: true })
}

const PageHeader = styled.div`display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem;`
const PageTitle = styled.h1`font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em;`
const PageSubtitle = styled.p`font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;`
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;`

const Card = styled.div<{ $over?: boolean }>`
  background: var(--bg-surface); border-radius: var(--radius-lg); padding: 1.4rem;
  border: 1.5px solid ${p => p.$over ? 'rgba(239,68,68,0.3)' : 'var(--border)'};
  box-shadow: ${p => p.$over ? '0 0 0 3px var(--danger-light)' : 'var(--shadow-sm)'};
  transition: box-shadow var(--transition);
`
const CardTop = styled.div`display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;`
const CategoryName = styled.h3`font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0;`
const Badge = styled.span<{ $over?: boolean }>`
  font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 20px;
  background: ${p => p.$over ? 'var(--danger-light)' : 'var(--success-light)'};
  color: ${p => p.$over ? 'var(--danger)' : 'var(--success)'};
`
const BarTrack = styled.div`height: 8px; border-radius: 4px; background: var(--bg-subtle); overflow: hidden; margin-bottom: 0.75rem;`
const BarFill = styled.div<{ $pct: number; $over?: boolean }>`
  height: 100%; border-radius: 4px; transition: width 0.5s ease; width: ${p => p.$pct}%;
  background: ${p => p.$over
    ? 'linear-gradient(90deg, var(--danger), var(--danger))'
    : p.$pct > 75
      ? 'linear-gradient(90deg, var(--warning), #f97316)'
      : 'linear-gradient(90deg, var(--primary), var(--primary-dark))'};
`
const AmtRow = styled.div`display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-secondary);`
const AmtBold = styled.span<{ $over?: boolean }>`font-weight: 700; color: ${p => p.$over ? 'var(--danger)' : 'var(--text-primary)'};`
const EditRow = styled.div`display: flex; gap: 0.5rem; margin-top: 1rem; align-items: center;`
const BudgetInput = styled.input`
  flex: 1; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem;
  font-family: 'Kanit',sans-serif; border: 1.5px solid var(--border); outline: none; color: var(--text-primary);
  background: var(--bg-subtle);
  &:focus { border-color: var(--primary); background: var(--bg-surface); box-shadow: 0 0 0 3px var(--primary-glow); }
`
const SaveBtn = styled.button`
  padding: 0.5rem 1rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 600;
  font-family: 'Kanit',sans-serif; cursor: pointer; border: none;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: #fff;
  &:hover { opacity: 0.9; }
`
const ClearBtn = styled.button`
  padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 600;
  font-family: 'Kanit',sans-serif; cursor: pointer; border: 1.5px solid var(--border);
  background: var(--bg-surface); color: var(--text-muted);
  &:hover { border-color: var(--danger); color: var(--danger); }
`
const NoBudget = styled.p`font-size: 0.78rem; color: var(--text-muted); margin: 0.5rem 0 0; font-style: italic;`

const SummaryCard = styled.div`
  background: var(--sidebar-bg);
  border-radius: var(--radius-lg); padding: 1.4rem 1.75rem;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;
`
const SumItem = styled.div`text-align: center;`
const SumLabel = styled.p`font-size: 0.72rem; color: rgba(255,255,255,0.5); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.3rem;`
const SumValue = styled.p<{ $ok?: boolean }>`
  font-size: 1.4rem; font-weight: 700; letter-spacing: -0.03em;
  color: ${p => p.$ok === undefined ? '#fff' : p.$ok ? '#86efac' : '#fca5a5'};
`

function BudgetPage() {
  const queryClient = useQueryClient()
  const { data: budgets = [], isLoading } = useQuery({ queryKey: ['budgets'], queryFn: fetchBudgets })
  const [inputs, setInputs] = useState<Record<number, string>>({})

  const handleSave = async (id: number) => {
    const val = inputs[id]
    const limit = val === '' ? null : Number(val)
    if (val !== '' && (isNaN(limit!) || limit! < 0)) {
      Swal.fire({ icon: 'error', title: 'ข้อมูลไม่ถูกต้อง', text: 'กรุณากรอกตัวเลขที่ถูกต้อง' }); return
    }
    await saveBudget(id, limit)
    queryClient.invalidateQueries({ queryKey: ['budgets'] })
    setInputs(prev => { const n = {...prev}; delete n[id]; return n })
    Swal.fire({ icon: 'success', title: 'บันทึกแล้ว', timer: 1200, showConfirmButton: false })
  }

  const withBudget = budgets.filter((b: any) => b.budget_limit !== null)
  const totalBudget = withBudget.reduce((s: number, b: any) => s + b.budget_limit, 0)
  const totalSpent = withBudget.reduce((s: number, b: any) => s + b.spent, 0)
  const overCount = budgets.filter((b: any) => b.over).length

  return (
    <MainContent>
      <PageHeader>
        <div>
          <PageTitle>🎯 Budget Planner</PageTitle>
          <PageSubtitle>ตั้งงบประมาณและติดตามการใช้จ่ายรายเดือน</PageSubtitle>
        </div>
      </PageHeader>

      {withBudget.length > 0 && (
        <SummaryCard>
          <SumItem><SumLabel>งบรวมเดือนนี้</SumLabel><SumValue>{totalBudget.toLocaleString('th-TH')} ฿</SumValue></SumItem>
          <SumItem><SumLabel>ใช้ไปแล้ว</SumLabel><SumValue $ok={totalSpent <= totalBudget}>{totalSpent.toLocaleString('th-TH')} ฿</SumValue></SumItem>
          <SumItem><SumLabel>หมวดที่เกิน</SumLabel><SumValue $ok={overCount === 0}>{overCount} หมวด</SumValue></SumItem>
        </SummaryCard>
      )}

      {isLoading ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>⏳ กำลังโหลด...</p>
      ) : (
        <Grid>
          {budgets.map((b: any) => {
            const pct = b.percent ?? 0
            return (
              <Card key={b.id} $over={b.over}>
                <CardTop>
                  <CategoryName>{b.name[0].toUpperCase() + b.name.slice(1)}</CategoryName>
                  {b.budget_limit !== null && <Badge $over={b.over}>{b.over ? '⚠️ เกิน' : `${pct}%`}</Badge>}
                </CardTop>
                {b.budget_limit !== null ? (
                  <>
                    <BarTrack><BarFill $pct={pct} $over={b.over} /></BarTrack>
                    <AmtRow>
                      <span>ใช้ไป</span>
                      <AmtBold $over={b.over}>{b.spent.toLocaleString('th-TH')} / {b.budget_limit.toLocaleString('th-TH')} ฿</AmtBold>
                    </AmtRow>
                  </>
                ) : (
                  <NoBudget>ยังไม่ได้ตั้ง budget (ใช้ไป {b.spent.toLocaleString('th-TH')} ฿)</NoBudget>
                )}
                <EditRow>
                  <BudgetInput type="number" min="0"
                    placeholder={b.budget_limit ? String(b.budget_limit) : 'ตั้ง budget (฿)'}
                    value={inputs[b.id] ?? ''}
                    onChange={e => setInputs(prev => ({ ...prev, [b.id]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && handleSave(b.id)}
                  />
                  <SaveBtn onClick={() => handleSave(b.id)}>บันทึก</SaveBtn>
                  {b.budget_limit !== null && (
                    <ClearBtn onClick={async () => { await saveBudget(b.id, null); queryClient.invalidateQueries({ queryKey: ['budgets'] }) }}>ล้าง</ClearBtn>
                  )}
                </EditRow>
              </Card>
            )
          })}
        </Grid>
      )}
    </MainContent>
  )
}

export default withAuthenticated(BudgetPage)
