
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

const CreateReceipts = () => {
      const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      setError,
      control
  } = useForm<TExpenseSchema>({
      resolver: zodResolver(expenseSchema),
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isError } = useQueryCategory(['category'], dispatch)


  if ( isError ) {
    console.log('0-----------------Category ERROR------->')
  }

  const user = useAppSelector(state => state.user)
  const category = useAppSelector(state => state.categoy.data) as Category[]

  if (!category) console.log(category,'not found')

  console.log('category---->',category)

  const type = expenseType.EXPENSE.TYPE
  
  const onSubmit = (data:any) => {
    createExpense(data,user, dispatch, router)
    console.log('Categort DATA',data)
  }
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '15px', display: 'flex', justifyContent:'center', flexDirection:'column', alignItems: 'center'}}>
        <div style={{ display: 'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: '0 1rem'}}>
            <Input register={register} field="name" errors={errors} control={control}/>
            <Input register={register} field="amount" errors={errors} control={control}/>
            <Input register={register} field="description" errors={errors} control={control}/>
            <InputSelect name="category" control={control} errors={errors} options={category?.map((c:any) => {
                return {
                    id: c.id,
                    value: c.name,
                    label: c.name[0].toUpperCase() + c.name.slice(1)
                }
            })}/>
            <InputSelect name="type" control={control} errors={errors} options={type}/>
            <Input register={register} field="date" type="date" errors={errors} control={control}/>
        </div>

        <button
            type="submit"
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
            Submit
        </button>
    </form>
    )
}

export default CreateReceipts