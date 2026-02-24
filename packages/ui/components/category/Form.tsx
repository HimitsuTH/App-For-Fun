import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import { TCategorySchema, categorySchema } from 'ui/types/income-expense/type'
import { Input } from 'ui/components/Input'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createCategory } from "../../utils/requests/category";
import styled from "styled-components";

const FormCard = styled.div`
  background: var(--bg-surface, #fff);
  border-radius: var(--radius-lg, 16px);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border, #e8ecf4);
  max-width: 560px;
  margin: 0 auto;
`

const FormTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border, #e8ecf4);
  &::before { content: '🗂️ '; }
`

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
  @media screen and (max-width: 500px) { grid-template-columns: 1fr; }
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border, #e8ecf4);
`

const Btn = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.65rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Kanit', sans-serif;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${p => p.variant === 'primary' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#f1f5f9'};
  color: ${p => p.variant === 'primary' ? '#ffffff' : 'var(--text-secondary, #64748b)'};
  box-shadow: ${p => p.variant === 'primary' ? '0 4px 16px rgba(99,102,241,0.3)' : 'none'};
  &:hover { transform: translateY(-1px); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`

const CreateCategory = () => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      control
    } = useForm<TCategorySchema>({ resolver: zodResolver(categorySchema) });

    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector(state => state.user)

    const onSubmit = (data: any) => {
        createCategory(data, user, dispatch, router)
    }

    return (
      <FormCard>
        <FormTitle>เพิ่มหมวดหมู่ใหม่</FormTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGrid>
            <Input register={register} field="name" errors={errors} control={control}/>
            <Input register={register} field="description" errors={errors} control={control}/>
          </FieldGrid>
          <ButtonRow>
            <Btn type="button" variant="secondary" onClick={() => router.back()}>← ยกเลิก</Btn>
            <Btn type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'กำลังบันทึก...' : '✓ บันทึก'}
            </Btn>
          </ButtonRow>
        </form>
      </FormCard>
    )
}

export default CreateCategory
