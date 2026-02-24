"use client";

import { ReactNode } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useRouter } from 'next/navigation'
import { UserStatus } from "./status";
import { logoutRequest } from 'ui/utils/requests/auth'
import { LinkComponent } from "./Link";
import styled from 'styled-components'

export const Nav = styled.div`
  height: var(--navbar-height, 60px);
  background-color: #ffffff;
  border-bottom: 1px solid var(--border, #e8ecf4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: var(--sidebar-width, 240px);
  right: 0;
  padding: 0 1.5rem;
  z-index: 101;
  box-shadow: 0 1px 0 var(--border, #e8ecf4);

  @media screen and (max-width: 768px) {
    left: 64px;
  }
`

export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const NavBrand = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--primary, #6366f1);
  letter-spacing: -0.02em;
`

export const NavList = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const UserEmail = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary, #64748b);
  font-weight: 500;
`

const LogoutBtn = styled.button`
  padding: 0.4rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: 'Kanit', sans-serif;
  background: var(--danger-light, #fef2f2);
  color: var(--danger, #ef4444);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--danger, #ef4444);
    color: white;
    border-color: var(--danger, #ef4444);
  }
`

interface NavbarProps {
  children?: ReactNode;
  className?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const { data } = useAppSelector((state) => state.user);
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onLogout = async () => {
    try {
      logoutRequest(dispatch)
      router.push('/login')
    } catch(err){
      console.error('Logout error:', err);
    }
  };

  const user = data;

  return (
    <Nav className={`${className}`}>
      <NavLeft>
        <NavBrand>💰 ExpensesApp</NavBrand>
      </NavLeft>
      <NavList>
        <UserStatus status={user?.status}/>
        <UserEmail>{user?.email}</UserEmail>
        <LogoutBtn onClick={onLogout}>ออกจากระบบ</LogoutBtn>
      </NavList>
    </Nav>
  );
};
