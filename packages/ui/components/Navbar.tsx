"use client";

import { ReactNode } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { cleanUser } from "../store/slices/user.slice";

import axios from "axios";
import { useRouter } from 'next/navigation'

import styled from 'styled-components'

export const Nav = styled.div`
  overflow: hidden;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  z-index: 2;
  transition: all ease 0.2s;
`

export const NavContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

`

interface NavbarProps {
  children?: ReactNode;
  className?: string;
}



export const Navbar = ({ children, className }: NavbarProps) => {
  const { data } = useAppSelector((state) => state.user);
  const router = useRouter()
  const dispatch = useAppDispatch()
  console.log("user---> web test ---->", data);
  const onLogout = async () => {
    try {
      await axios.post('http://localhost:8000/auth/logout',{},{ 
        withCredentials: true, 
      });
      dispatch(cleanUser())
      router.push('/login')
      console.log('Logout successful');
    } catch(err){
      console.error('Logout error:', err);
    }
  };
  const user = data;
  return (
    <Nav className={`${className}`}>
      <div/>
      <NavContent>
        <p>{user?.email}</p>
        <button
          onClick={onLogout}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#da190b")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f44336")}
        >
          Logout
        </button>
      </NavContent>
    </Nav>
  );
};
