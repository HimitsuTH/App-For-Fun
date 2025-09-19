
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { TExpenseSchema, expenseSchema } from 'ui/types/income-expense/type'

import { Input } from 'ui/components/Input'

const CreateReceipts = () => {
      const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      setError,
  } = useForm<TExpenseSchema>({
      resolver: zodResolver(expenseSchema),
  });
  
  const onSubmit = (data:any) => {
    console.log(data)
  }
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '15px', display: 'flex', justifyContent:'center', flexDirection:'column', alignItems: 'center'}}>
        <div style={{ display: 'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: '0 1rem'}}>
            <Input register={register} field="name" errors={errors}/>
            <Input register={register} field="amount" errors={errors}/>
            <Input register={register} field="type" errors={errors}/>
            <Input register={register} field="description" errors={errors}/>
            <Input register={register} field="date" type="date" errors={errors}/>
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