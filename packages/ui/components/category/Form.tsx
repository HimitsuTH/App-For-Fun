
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'

import { TCategorySchema, categorySchema } from 'ui/types/income-expense/type'

import { Input } from 'ui/components/Input'
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { createCategory } from "../../utils/requests/category";


const CreateCategory = () => {
      const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      setError,
      control
  } = useForm<TCategorySchema>({
      resolver: zodResolver(categorySchema),
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector(state => state.user)

  const handleGoBack = () => {
    router.back(); 
  };
  
  const onSubmit = (data:any) => {
    createCategory(data,user, dispatch, router)
    console.log('Categort DATA',data)
  }
    return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '15px', display: 'flex', justifyContent:'center', flexDirection:'column', alignItems: 'center', width: '100%'}}>
        <div style={{ display: 'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: '0 1rem'}}>
            <Input register={register} field="name" errors={errors} control={control}/>
            
            <Input register={register} field="description" errors={errors} control={control}/>
        </div>

        {/* --- Button Container for grouping buttons --- */}
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            
            {/* 1. Back Button */}
            <button
                type="button" // Important: set type="button" to prevent form submission
                onClick={handleGoBack}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#6c757d', // A gray color for contrast
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
            >
                Back
            </button>
            
            {/* 2. Submit Button (Existing) */}
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

        </div>
        {/* --------------------------------------------- */}
    </form>
    )
}

export default CreateCategory