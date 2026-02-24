"use client";
import { ReactNode } from "react";
import { LinkComponent } from "./Link";
import styled from 'styled-components'

export const MenuComponent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width, 240px);
  height: 100vh;
  background: var(--sidebar-bg, #1a1d2e);
  display: flex;
  flex-direction: column;
  z-index: 302;
  transition: width 0.2s ease;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 64px;
  }
`

export const SidebarHeader = styled.div`
  height: var(--navbar-height, 60px);
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  border-bottom: 1px solid var(--sidebar-border, rgba(255,255,255,0.06));
  flex-shrink: 0;
`

export const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1rem;
  color: #ffffff;
  letter-spacing: -0.01em;
  white-space: nowrap;
`

export const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(99,102,241,0.4);
`

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 1rem 0.75rem;
  overflow-y: auto;
`

export const MenuSectionTitle = styled.p`
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--sidebar-text, #a0a8c0);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const ListMenuContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const ListMenuSub = styled.li``

export const SidebarFooter = styled.div`
  padding: 1rem 0.75rem;
  border-top: 1px solid var(--sidebar-border, rgba(255,255,255,0.06));
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 1.25rem;

  @media screen and (max-width: 768px) {
    justify-content: center;
    padding-left: 0;
  }
`

const FooterText = styled.span`
  font-size: 0.7rem;
  color: var(--sidebar-text, #a0a8c0);
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

interface MenuProps {
  children?: ReactNode;
  className?: string;
}

export const LeftSideMenu = ({ children, className }: MenuProps) => {
  return (
    <MenuComponent className={`${className}`}>
      <SidebarNav>
        <MenuSectionTitle>เมนูหลัก</MenuSectionTitle>
        <ListMenuContainer>
          <ListMenuSub>
            <LinkComponent title="หน้าหลัก" href="/" ishome={true}/>
          </ListMenuSub>
          <ListMenuSub>
            <LinkComponent title="รายรับ-รายจ่าย" href="/expenses"/>
          </ListMenuSub>
          <ListMenuSub>
            <LinkComponent title="หมวดหมู่" href="/category"/>
          </ListMenuSub>
        </ListMenuContainer>
      </SidebarNav>

      <SidebarFooter>
        <span style={{ fontSize: '1rem' }}>⚙️</span>
        <FooterText>v1.0.0</FooterText>
      </SidebarFooter>
    </MenuComponent>
  );
};
