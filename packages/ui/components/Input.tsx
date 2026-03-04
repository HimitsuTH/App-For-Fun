import { type JSX } from "react";
import styled from "styled-components";
import { Control } from "react-hook-form";

const InputWrapper = styled.div`
  display: flex; flex-direction: column; gap: 0.35rem;
  width: 100%; padding: 0.5rem;
`

const Label = styled.label`
  font-size: 0.8rem; font-weight: 600;
  color: var(--text-secondary);
  text-transform: capitalize; letter-spacing: 0.02em;
`

const StyledInput = styled.input`
  width: 100%; padding: 0.65rem 0.9rem;
  font-size: 0.9rem; font-family: 'Kanit', sans-serif; font-weight: 400;
  color: var(--text-primary);
  background: var(--bg-surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-glow);
    background: var(--bg-surface);
  }

  &::placeholder { color: var(--text-muted); }

  &[type="date"] { color: var(--text-primary); }
`

const ErrorMsg = styled.p`
  font-size: 0.75rem; color: var(--danger); margin-top: 0.1rem;
`

export function Input(props: {
  field: string;
  register: any;
  type?: string;
  errors: any;
  control: Control<any, any>;
  placeholder?: string;
}): JSX.Element {
  const { register, field } = props

  return (
    <InputWrapper>
      <Label>{field}</Label>
      <StyledInput
        {...register(field)}
        placeholder={props.placeholder || `กรอก ${field}`}
        type={props.type}
      />
      {props.errors[field] && <ErrorMsg>{props.errors[field].message}</ErrorMsg>}
    </InputWrapper>
  );
}
