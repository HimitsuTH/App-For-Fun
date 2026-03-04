import { type JSX } from "react";
import Link from 'next/link';
import styled from 'styled-components'

interface LinkProps {
  title: string;
  href?: string;
  ishome?: boolean;
}

const SidebarLink = styled(Link)`
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.55rem 0.75rem; border-radius: var(--radius-sm);
  font-size: 0.875rem; font-weight: 500;
  color: var(--sidebar-text); transition: all var(--transition);
  white-space: nowrap;

  &:hover {
    background: var(--sidebar-hover);
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    justify-content: center; padding: 0.6rem; gap: 0;
  }
`
const IconBadge = styled.span`
  width: 28px; height: 28px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
`
const LinkTitle = styled.span`
  @media screen and (max-width: 768px) { display: none; }
`

const ICONS: Record<string, string> = {
  'หน้าหลัก':       '🏠',
  'รายรับ-รายจ่าย': '💳',
  'หมวดหมู่':       '🗂️',
  'Budget Planner': '🎯',
}

export const LinkComponent = ({ title, href, ishome = false }: LinkProps): JSX.Element => {
  const icon = ICONS[title] || '•'

  return (
    <SidebarLink href={href ?? '/'}>
      <IconBadge>{icon}</IconBadge>
      <LinkTitle>{title}</LinkTitle>
    </SidebarLink>
  )
}

export const LinkContainer = styled.div``
