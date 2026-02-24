import { type JSX } from "react";
import styled from "styled-components";
import { Control } from "react-hook-form";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  padding: 0.5rem;
`

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary, #64748b);
  text-transform: capitalize;
  letter-spacing: 0.02em;
`

const StyledInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  font-family: 'Kanit', sans-serif;
  font-weight: 400;
  color: var(--text-primary, #0f172a);
  background: var(--bg-surface, #ffffff);
  border: 1.5px solid var(--border, #e8ecf4);
  border-radius: var(--radius-md, 12px);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: var(--primary, #6366f1);
    box-shadow: 0 0 0 3px var(--primary-glow, rgba(99,102,241,0.15));
  }

  &::placeholder {
    color: var(--text-muted, #94a3b8);
  }
`

const ErrorMsg = styled.p`
  font-size: 0.75rem;
  color: var(--danger, #ef4444);
  margin-top: 0.1rem;
`

export function Input(props: {
  field: string;
  register: any,
  type?: string
  errors: any
  control: Control<any,any>
  placeholder?: string
}): JSX.Element {
  const { register, field } = props

  return (
    <InputWrapper>
      <Label>{field}</Label>
      <StyledInput
        {...register(field)}
        control={props.control}
        placeholder={props.placeholder || `กรอก ${field}`}
        type={props.type}
      />
      {props.errors[field] && <ErrorMsg>{props.errors[field].message}</ErrorMsg>}
    </InputWrapper>
  );
}
