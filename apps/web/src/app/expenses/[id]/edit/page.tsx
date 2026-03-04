'use client'

import withAuthenticated from "../../../../hocs/with-auth-hoc"
import { MainContent } from 'ui/components/Main'
import { useRouter, useParams } from 'next/navigation'
import { useQuery } from "@tanstack/react-query"
import { getExpenses, updateExpense } from "ui/utils/requests/expense"
import { useQueryCategory } from "ui/utils/requests/category"
import { useAppDispatch, useAppSelector } from "ui/store/hooks"
import { Category } from "ui/store/slices/category.slice"
import { useForm, Controller } from "react-hook-form"
import { useEffect } from "react"
import Select from "react-select"
import styled from "styled-components"

const Card = styled.div`
  background: #fff; border-radius: 16px; max-width: 700px; margin: 0 auto;
  border: 1px solid var(--border, #e8ecf4); box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  padding: 2rem;
`
const PageTitle = styled.h1`
  font-size: 1.4rem; font-weight: 700; color: #0f172a;
  letter-spacing: -0.02em; margin-bottom: 0.25rem;
`
const PageSubtitle = styled.p`font-size: 0.82rem; color: #94a3b8; margin-bottom: 1.75rem;`
const Grid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; @media(max-width:600px){grid-template-columns:1fr;}`
const Field = styled.div`display: flex; flex-direction: column; gap: 0.35rem;`
const Label = styled.label`font-size: 0.78rem; font-weight: 600; color: #475569; letter-spacing: 0.02em;`
const StyledInput = styled.input`
  padding: 0.7rem 0.9rem; border-radius: 10px; font-size: 0.9rem; font-family: 'Kanit',sans-serif;
  border: 1.5px solid #e2e8f0; outline: none; width: 100%; color: #0f172a; background: #f8fafc;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
`
const ErrMsg = styled.p`font-size: 0.73rem; color: #ef4444; margin-top: 0.2rem;`
const BtnRow = styled.div`display: flex; gap: 0.75rem; margin-top: 1.5rem; justify-content: flex-end;`
const Btn = styled.button<{ $variant?: string }>`
  padding: 0.65rem 1.4rem; border-radius: 10px; font-size: 0.9rem; font-weight: 600;
  font-family: 'Kanit',sans-serif; cursor: pointer; border: none; transition: all 0.2s;
  background: ${p => p.$variant === 'primary'
    ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : '#f1f5f9'};
  color: ${p => p.$variant === 'primary' ? '#fff' : '#475569'};
  &:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(99,102,241,0.25); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`

const TYPE_OPTIONS = [
  { value: 'INCOME', label: 'รายรับ (INCOME)' },
  { value: 'EXPENSE', label: 'รายจ่าย (EXPENSE)' },
]

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderRadius: '10px',
    borderColor: state.isFocused ? '#6366f1' : '#e2e8f0',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
    background: '#f8fafc',
    fontFamily: 'Kanit, sans-serif',
    fontSize: '0.9rem',
    minHeight: '42px',
    '&:hover': { borderColor: '#6366f1' },
  }),
  option: (base: any, state: any) => ({
    ...base,
    fontFamily: 'Kanit, sans-serif',
    background: state.isSelected ? '#6366f1' : state.isFocused ? '#eef2ff' : '#fff',
    color: state.isSelected ? '#fff' : '#0f172a',
  }),
}

function EditExpensePage() {
  const router = useRouter()
  const params = useParams()
  const dispatch = useAppDispatch()
  const id = Number(params.id)

  const { data } = useQuery({ queryKey: ['expenses'], queryFn: getExpenses })
  const expense = data?.expenses?.find((e: any) => e.id === id)

  useQueryCategory(['category'], dispatch)
  const categories = useAppSelector(state => state.categoy.data) as Category[]

  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    if (expense) {
      reset({
        name: expense.name,
        amount: String(expense.amount),
        description: expense.description,
        date: expense.date?.slice(0, 10),
        type: TYPE_OPTIONS.find(t => t.value === expense.type),
        category: categories
          ? { id: expense.categories?.id, value: expense.categories?.name, label: expense.categories?.name }
          : undefined,
      })
    }
  }, [expense, categories])

  const onSubmit = async (formData: any) => {
    await updateExpense(id, {
      name: formData.name,
      amount: formData.amount,
      description: formData.description,
      date: formData.date,
      type: formData.type?.value,
      category_id: formData.category?.id,
    }, router)
  }

  if (!expense) return (
    <MainContent>
      <Card><p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>⏳ กำลังโหลด...</p></Card>
    </MainContent>
  )

  const categoryOptions = categories?.map((c: any) => ({
    id: c.id, value: c.name, label: c.name[0].toUpperCase() + c.name.slice(1)
  })) ?? []

  return (
    <MainContent>
      <Card>
        <PageTitle>✏️ แก้ไขรายการ</PageTitle>
        <PageSubtitle>แก้ไขข้อมูลรายรับ-รายจ่าย</PageSubtitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Field>
              <Label>ชื่อรายการ</Label>
              <StyledInput {...register('name', { required: 'กรุณากรอกชื่อรายการ' })} placeholder="ชื่อรายการ" />
              {errors.name && <ErrMsg>{String(errors.name.message)}</ErrMsg>}
            </Field>

            <Field>
              <Label>จำนวนเงิน</Label>
              <StyledInput {...register('amount', { required: 'กรุณากรอกจำนวนเงิน' })} type="number" placeholder="0.00" />
              {errors.amount && <ErrMsg>{String(errors.amount.message)}</ErrMsg>}
            </Field>

            <Field>
              <Label>หมวดหมู่</Label>
              <Controller name="category" control={control} render={({ field }) => (
                <Select {...field} options={categoryOptions} styles={selectStyles} placeholder="เลือกหมวดหมู่" />
              )} />
            </Field>

            <Field>
              <Label>ประเภท</Label>
              <Controller name="type" control={control} render={({ field }) => (
                <Select {...field} options={TYPE_OPTIONS} styles={selectStyles} placeholder="เลือกประเภท" />
              )} />
            </Field>

            <Field>
              <Label>วันที่</Label>
              <StyledInput {...register('date', { required: 'กรุณาเลือกวันที่' })} type="date" />
              {errors.date && <ErrMsg>{String(errors.date.message)}</ErrMsg>}
            </Field>

            <Field>
              <Label>หมายเหตุ</Label>
              <StyledInput {...register('description')} placeholder="หมายเหตุ (ถ้ามี)" />
            </Field>
          </Grid>

          <BtnRow>
            <Btn type="button" onClick={() => router.back()}>← ยกเลิก</Btn>
            <Btn type="submit" $variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'กำลังบันทึก...' : '💾 บันทึก'}
            </Btn>
          </BtnRow>
        </form>
      </Card>
    </MainContent>
  )
}

export default withAuthenticated(EditExpensePage)
