"use client";
import { ReactNode } from "react";
import { LinkComponent } from "./Link";
import styled from 'styled-components'

export const MenuComponent = styled.div`
  position: fixed; top: 0; left: 0;
  width: var(--sidebar-width); height: 100vh;
  background: var(--sidebar-bg);
  display: flex; flex-direction: column;
  z-index: 302; overflow: hidden;
  transition: width var(--transition);

  @media screen and (max-width: 768px) { width: 64px; }
`

export const SidebarHeader = styled.div`
  height: var(--navbar-height);
  display: flex; align-items: center;
  padding: 0 1.25rem;
  border-bottom: 1px solid var(--sidebar-border);
  flex-shrink: 0;
`

export const SidebarLogo = styled.div`
  display: flex; align-items: center; gap: 0.6rem;
  font-weight: 700; font-size: 1rem;
  color: #fff; letter-spacing: -0.01em; white-space: nowrap;
`

export const LogoIcon = styled.div`
  width: 32px; height: 32px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; flex-shrink: 0;
  box-shadow: 0 4px 12px var(--primary-shadow);
`

export const SidebarNav = styled.nav`
  flex: 1; padding: 1rem 0.75rem; overflow-y: auto;
`

export const MenuSectionTitle = styled.p`
  font-size: 0.65rem; font-weight: 600;
  color: var(--sidebar-text); opacity: 0.6;
  text-transform: uppercase; letter-spacing: 0.12em;
  padding: 0 0.5rem; margin-bottom: 0.5rem; margin-top: 0.5rem;

  @media screen and (max-width: 768px) { display: none; }
`

export const ListMenuContainer = styled.ul`
  list-style-type: none; display: flex; flex-direction: column; gap: 0.2rem;
`

export const ListMenuSub = styled.li``

export const SidebarFooter = styled.div`
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--sidebar-border);
  display: flex; align-items: center; gap: 0.5rem;

  @media screen and (max-width: 768px) { justify-content: center; padding: 1rem 0; }
`

const FooterText = styled.span`
  font-size: 0.7rem; color: var(--sidebar-text); opacity: 0.5; white-space: nowrap;
  @media screen and (max-width: 768px) { display: none; }
`

interface MenuProps { children?: ReactNode; className?: string; }

export const LeftSideMenu = ({ children, className }: MenuProps) => {
  return (
    <MenuComponent className={className}>
      <SidebarNav>
        <MenuSectionTitle>เมนูหลัก</MenuSectionTitle>
        <ListMenuContainer>
          <ListMenuSub><LinkComponent title="หน้าหลัก" href="/" ishome={true} /></ListMenuSub>
          <ListMenuSub><LinkComponent title="รายรับ-รายจ่าย" href="/expenses" /></ListMenuSub>
          <ListMenuSub><LinkComponent title="หมวดหมู่" href="/category" /></ListMenuSub>
          <ListMenuSub><LinkComponent title="Budget Planner" href="/budget" /></ListMenuSub>
        </ListMenuContainer>
      </SidebarNav>

      <SidebarFooter>
        <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>⚙️</span>
        <FooterText>v1.0.0</FooterText>
      </SidebarFooter>
    </MenuComponent>
  );
};
