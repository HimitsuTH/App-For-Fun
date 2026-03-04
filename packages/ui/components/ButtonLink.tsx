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
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Kanit', sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition);

  background: ${p => p.buttontype === 'create'
    ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))'
    : 'var(--bg-subtle)'};
  color: ${p => p.buttontype === 'create' ? '#fff' : 'var(--text-secondary)'};
  box-shadow: ${p => p.buttontype === 'create' ? '0 4px 14px var(--primary-shadow)' : 'none'};
  border: 1.5px solid ${p => p.buttontype === 'create' ? 'transparent' : 'var(--border)'};

  &::before {
    content: ${p => p.buttontype === 'create' ? '"+"' : '"←"'};
    font-size: 1rem;
    font-weight: 700;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${p => p.buttontype === 'create'
      ? '0 6px 20px var(--primary-shadow)'
      : 'var(--shadow-sm)'};
    opacity: 0.92;
  }

  &:active { transform: translateY(0); }
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
