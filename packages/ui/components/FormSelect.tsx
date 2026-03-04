import { type JSX } from "react";
import styled from "styled-components";
import Select from 'react-select'
import { Control, Controller } from 'react-hook-form'

const Wrapper = styled.div`display: flex; flex-direction: column; gap: 0.35rem; width: 100%; padding: 0.5rem;`
const Label = styled.label`font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: capitalize; letter-spacing: 0.02em;`
const ErrorMsg = styled.p`font-size: 0.75rem; color: var(--danger); margin-top: 0.1rem;`

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderRadius: 'var(--radius-md, 12px)',
    borderColor: state.isFocused ? 'var(--primary, #6366f1)' : 'var(--border, #e2e8f0)',
    borderWidth: '1.5px',
    boxShadow: state.isFocused ? '0 0 0 3px var(--primary-glow, rgba(99,102,241,0.15))' : 'none',
    background: 'var(--bg-subtle, #f8fafc)',
    fontFamily: "'Kanit', sans-serif",
    fontSize: '0.9rem', minHeight: '42px',
    '&:hover': { borderColor: 'var(--primary, #6366f1)' },
  }),
  option: (base: any, state: any) => ({
    ...base,
    fontFamily: "'Kanit', sans-serif", fontSize: '0.875rem',
    background: state.isSelected
      ? 'var(--primary, #6366f1)'
      : state.isFocused ? 'var(--primary-light, #eef2ff)' : 'var(--bg-surface, #fff)',
    color: state.isSelected ? '#fff' : 'var(--text-primary, #0f172a)',
    cursor: 'pointer',
  }),
  placeholder: (base: any) => ({ ...base, color: 'var(--text-muted, #94a3b8)', fontSize: '0.875rem' }),
  singleValue: (base: any) => ({ ...base, color: 'var(--text-primary, #0f172a)' }),
  menu: (base: any) => ({
    ...base, borderRadius: 'var(--radius-md, 12px)',
    border: '1px solid var(--border, #e2e8f0)',
    boxShadow: 'var(--shadow-md, 0 4px 12px rgba(0,0,0,0.08))', overflow: 'hidden',
  }),
  menuList: (base: any) => ({ ...base, padding: '4px' }),
}

export function InputSelect(props: {
  name: string; control: Control<any, any>
  options: { value: string; label: string }[]
  errors: any
}): JSX.Element {
  const { name } = props
  return (
    <Wrapper>
      <Label>{name[0].toUpperCase() + name.slice(1)}</Label>
      <Controller name={name} control={props.control} render={({ field }) => (
        <Select {...field} maxMenuHeight={180} menuPlacement="auto"
          options={props.options || []} styles={selectStyles}
          placeholder={`เลือก${name}`}
          loadingMessage={() => <span>Loading...</span>}
          components={{ IndicatorSeparator: () => null }} />
      )} />
      {props.errors[name] && <ErrorMsg>{props.errors[name].message}</ErrorMsg>}
    </Wrapper>
  );
}
