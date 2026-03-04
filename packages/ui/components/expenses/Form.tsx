'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import { TExpenseSchema, expenseSchema } from 'ui/types/income-expense/type'
import { Input } from 'ui/components/Input'
import { InputSelect } from "../FormSelect";
import { useQueryCategory } from "../../utils/requests/category";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Category } from "../../store/slices/category.slice";
import { createExpense } from "../../utils/requests/expense";
import expenseType from 'ui/constants/expense.type.json'
import styled from "styled-components";

const Wrapper = styled.div`max-width: 680px; margin: 0 auto;`

const Card = styled.div`
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`
const CardHeader = styled.div`
  padding: 1.75rem 2rem 1.25rem;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, var(--bg-subtle) 0%, var(--primary-light) 100%);
`
const HeaderIcon = styled.div`
  width: 44px; height: 44px; border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; box-shadow: 0 4px 12px var(--primary-shadow); margin-bottom: 0.75rem;
`
const CardTitle = styled.h2`font-size: 1.2rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; margin: 0;`
const CardSubtitle = styled.p`font-size: 0.8rem; color: var(--text-muted); margin: 0.2rem 0 0;`
const CardBody = styled.div`padding: 1.75rem 2rem;`
const Grid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem 0.5rem;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`
const FullRow = styled.div`grid-column: 1 / -1;`
const Divider = styled.div`height: 1px; background: var(--border); margin: 1.25rem 0;`
const BtnRow = styled.div`display: flex; gap: 0.75rem; justify-content: flex-end;`

const BackBtn = styled.button`
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.65rem 1.25rem; border-radius: var(--radius-md);
  font-size: 0.875rem; font-weight: 600; font-family: 'Kanit', sans-serif;
  cursor: pointer; border: 1.5px solid var(--border);
  background: var(--bg-surface); color: var(--text-secondary); transition: all var(--transition);
  &:hover { border-color: var(--border-strong); color: var(--text-primary); }
`
const SubmitBtn = styled.button`
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.65rem 1.5rem; border-radius: var(--radius-md);
  font-size: 0.875rem; font-weight: 700; font-family: 'Kanit', sans-serif;
  cursor: pointer; border: none;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: #fff; box-shadow: 0 4px 14px var(--primary-shadow); transition: all var(--transition);
  &:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px var(--primary-shadow); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`
const TypeHint = styled.div<{ $type?: string }>`
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 0.9rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;
  background: ${p => p.$type === 'INCOME' ? 'var(--success-light)' : p.$type === 'EXPENSE' ? 'var(--danger-light)' : 'var(--bg-subtle)'};
  border: 1px solid ${p => p.$type === 'INCOME' ? '#bbf7d0' : p.$type === 'EXPENSE' ? '#fecaca' : 'var(--border)'};
  font-size: 0.8rem; font-weight: 600;
  color: ${p => p.$type === 'INCOME' ? 'var(--success)' : p.$type === 'EXPENSE' ? 'var(--danger)' : 'var(--text-muted)'};
  transition: all 0.3s;
`

const CreateReceipts = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, control, watch } =
    useForm<TExpenseSchema>({ resolver: zodResolver(expenseSchema) });

  const dispatch = useAppDispatch();
  const router = useRouter();
  useQueryCategory(['category'], dispatch)
  const user = useAppSelector(state => state.user)
  const category = useAppSelector(state => state.categoy.data) as Category[]
  const watchedType = watch('type') as any
  const type = expenseType.EXPENSE.TYPE

  const onSubmit = (data: any) => createExpense(data, user, dispatch, router)

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <HeaderIcon>💳</HeaderIcon>
          <CardTitle>เพิ่มรายการใหม่</CardTitle>
          <CardSubtitle>กรอกข้อมูลรายรับหรือรายจ่ายของคุณ</CardSubtitle>
        </CardHeader>
        <CardBody>
          <TypeHint $type={watchedType?.value}>
            {watchedType?.value === 'INCOME' && '▲ รายรับ — เงินที่ได้รับเข้ามา'}
            {watchedType?.value === 'EXPENSE' && '▼ รายจ่าย — เงินที่ใช้ออกไป'}
            {!watchedType?.value && '○ เลือกประเภทรายการด้านล่าง'}
          </TypeHint>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
              <Input register={register} field="name" errors={errors} control={control} placeholder="เช่น ค่าอาหาร, เงินเดือน" />
              <Input register={register} field="amount" errors={errors} control={control} placeholder="0.00" />
              <InputSelect name="category" control={control} errors={errors}
                options={category?.map((c: any) => ({ id: c.id, value: c.name, label: c.name[0].toUpperCase() + c.name.slice(1) })) ?? []} />
              <InputSelect name="type" control={control} errors={errors} options={type} />
              <Input register={register} field="date" type="date" errors={errors} control={control} />
              <FullRow>
                <Input register={register} field="description" errors={errors} control={control} placeholder="หมายเหตุ (ไม่บังคับ)" />
              </FullRow>
            </Grid>
            <Divider />
            <BtnRow>
              <BackBtn type="button" onClick={() => router.back()}>← ยกเลิก</BackBtn>
              <SubmitBtn type="submit" disabled={isSubmitting}>
                {isSubmitting ? '⏳ กำลังบันทึก...' : '+ บันทึกรายการ'}
              </SubmitBtn>
            </BtnRow>
          </form>
        </CardBody>
      </Card>
    </Wrapper>
  )
}

export default CreateReceipts
