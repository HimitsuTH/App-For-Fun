import { type JSX } from "react";
import styled from "styled-components";
import { Control } from "react-hook-form";

const InputContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  width: 300px;
  flex-decoration: column;
`

export function Input(props: {
  field: string;
  register: any,
  type?: string
  errors: any
  control: Control<any,any>
}): JSX.Element {
  const { register , field } = props

  console.log(props.errors)


  return (
    <InputContainer>
      <div style={{ marginBottom: '2rem',  width: '100%'}}>
        <label>{field}</label>
        <input
          {...register(field)}
          control={props.control}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          type={props.type}
          style={{ padding: '10px', marginTop: '0.5rem', display: 'block', width: '100%' }}
        />
      {props.errors[field] && <p style={{ color: 'red', marginTop: '0.5rem' }}>{props.errors[field].message}</p>}
      </div>
    </InputContainer>
  );
}
