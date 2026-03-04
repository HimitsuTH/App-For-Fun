"use client";

import { ReactNode } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useRouter } from 'next/navigation'
import { UserStatus } from "./status";
import { logoutRequest } from 'ui/utils/requests/auth'
import styled from 'styled-components'

export const Nav = styled.div`
  height: var(--navbar-height);
  background: var(--navbar-bg);
  border-bottom: 1px solid var(--navbar-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: var(--sidebar-width);
  right: 0;
  padding: 0 1.5rem;
  z-index: 101;
  box-shadow: var(--shadow-xs);
  transition: left var(--transition);

  @media screen and (max-width: 768px) { left: 64px; }
`
const NavLeft = styled.div`display: flex; align-items: center; gap: 0.75rem;`
const NavBrand = styled.div`
  font-weight: 700; font-size: 1rem;
  color: var(--primary); letter-spacing: -0.02em;
`
const NavRight = styled.div`display: flex; align-items: center; gap: 0.75rem;`
const UserEmail = styled.span`
  font-size: 0.82rem; color: var(--text-muted); font-weight: 500;
`
const LogoutBtn = styled.button`
  padding: 0.4rem 1rem; font-size: 0.8rem; font-weight: 600;
  font-family: 'Kanit', sans-serif;
  background: var(--danger-light); color: var(--danger);
  border: 1px solid rgba(239,68,68,0.2);
  border-radius: var(--radius-sm); cursor: pointer;
  transition: all var(--transition);
  &:hover { background: var(--danger); color: #fff; border-color: var(--danger); }
`

interface NavbarProps { children?: ReactNode; className?: string; }

export const Navbar = ({ children, className }: NavbarProps) => {
  const { data } = useAppSelector((state) => state.user);
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onLogout = async () => {
    logoutRequest(dispatch)
    router.push('/login')
  };

  return (
    <Nav className={className}>
      <NavLeft>
        <NavBrand>💰 ExpensesApp</NavBrand>
      </NavLeft>
      <NavRight>
        <UserStatus status={data?.status} />
        <UserEmail>{data?.email}</UserEmail>
        <LogoutBtn onClick={onLogout}>ออกจากระบบ</LogoutBtn>
      </NavRight>
    </Nav>
  );
};
