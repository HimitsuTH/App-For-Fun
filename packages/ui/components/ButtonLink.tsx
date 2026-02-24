import { type JSX } from "react";
import styled from "styled-components";
import Link from 'next/link';

type ButtonType = 'create' | 'default';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0 1rem 0;
`

const StyledLink = styled(Link)<{ buttontype: ButtonType }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.25rem;
  border-radius: var(--radius-sm, 8px);
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Kanit', sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${p => p.buttontype === 'create'
    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    : '#f1f5f9'};
  color: ${p => p.buttontype === 'create' ? '#ffffff' : 'var(--text-secondary, #64748b)'};
  box-shadow: ${p => p.buttontype === 'create' ? 'var(--shadow-primary, 0 4px 16px rgba(99,102,241,0.3))' : 'none'};

  &::before {
    content: ${p => p.buttontype === 'create' ? '"+"' : '"←"'};
    font-size: 1rem;
    font-weight: 700;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${p => p.buttontype === 'create'
      ? '0 6px 20px rgba(99,102,241,0.4)'
      : 'var(--shadow-sm)'};
    background: ${p => p.buttontype === 'create'
      ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
      : '#e8ecf4'};
  }

  &:active {
    transform: translateY(0);
  }
`

export function ButtonCustom(props: {
  title: string;
  href?: string;
  type?: ButtonType
}): JSX.Element {
  const { title, href, type = 'default' } = props;

  return (
    <ButtonContainer>
      <StyledLink href={href || '/'} buttontype={type}>
        {title}
      </StyledLink>
    </ButtonContainer>
  );
}
