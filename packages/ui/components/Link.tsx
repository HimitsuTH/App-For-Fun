import { type JSX } from "react";
import Link from 'next/link';
import styled, { css } from 'styled-components'

interface LinkProps {
  title: string;
  href?: string;
  ishome?: boolean;
}

const SidebarLink = styled(Link)<{ $isHome?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--sidebar-text, #a0a8c0);
  transition: all 0.18s ease;
  white-space: nowrap;

  &:hover {
    background: var(--sidebar-hover-bg, rgba(255,255,255,0.06));
    color: var(--sidebar-active, #ffffff);
  }

  /* Active state - you can use next/link activeClassName or CSS */
  @media screen and (max-width: 768px) {
    justify-content: center;
    padding: 0.6rem;
    gap: 0;
  }
`

const IconBadge = styled.span`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`

const LinkTitle = styled.span`
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const ICONS: Record<string, string> = {
  'หน้าหลัก': '🏠',
  'Home': '🏠',
  'รายรับ-รายจ่าย': '💳',
  'Expenses list': '💳',
  'หมวดหมู่': '🗂️',
  'Category': '🗂️',
}

export const LinkComponent = ({title, href, ishome = false}: LinkProps): JSX.Element => {
  const icon = ICONS[title] || title[0];

  return (
    <SidebarLink href={href ? href : '/'} $isHome={ishome}>
      <IconBadge>{icon}</IconBadge>
      <LinkTitle>{title}</LinkTitle>
    </SidebarLink>
  )
}

// Keep old exports for backward compat
export const LinkContainer = styled.div``
