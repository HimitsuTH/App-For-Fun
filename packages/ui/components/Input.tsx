import { type JSX } from "react";
import styled from "styled-components";


const InputContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  width: 300px;
  flex-decoration: column;

`

export function Input({
  field,
  register,
  type,
  errors
}: {
  field: string;
  register: any,
  type?: string
  errors: any
}): JSX.Element {



  return (
    <InputContainer>
      <div style={{ marginBottom: '2rem',  width: '100%'}}>
        <label>{field[0].toUpperCase() + field.slice(1)}</label>
        <input
          {...register(field)}
          placeholder={field}
          type={type}
          style={{ padding: '10px', marginTop: '0.5rem', display: 'block', width: '100%' }}
        />
      {errors[field] && <p style={{ color: 'red', marginTop: '0.5rem' }}>{errors[field].message}</p>}
      </div>
    </InputContainer>
  );
}
