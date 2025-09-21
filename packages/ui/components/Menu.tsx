"use client";

import { type JSX } from "react";
import { ReactNode } from "react";
import Link from 'next/link';

import styled from 'styled-components'

export const MenuComponent = styled.div`
  overflow: hidden;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  gap: 1rem;
  width: 20%;
  height: 100vh;

  z-index: 2;
  transition: all ease 0.2s;
`

export const ButtonMenu =  styled.div`
    width: 100%;
    padding: 1rem;
`

export const LinkContainer =  styled.div`
    background-color: #F7F7F7;
    width: 100%;
    position: relative;
    padding: 0.5rem;
`



interface MenuProps {
  children?: ReactNode;
  className?: string;
}

interface LinkProps {
  title: string;
  href?: string;
}

const LinkComponent = ({title, href}:LinkProps): JSX.Element => {
  return (
    <LinkContainer><Link href={href ? href : '/'} style={{ width:'100%', display: 'block'}}>{title}</Link></LinkContainer>
  )
}



export const LeftSideMenu = ({ children, className }: MenuProps) => {
//   const { data } = useAppSelector((state) => state.user);

  return (
    <MenuComponent className={`${className}`}>
        <LinkComponent title="Home"/>
        <LinkComponent title="Receipts" href="/receipts"/>
        <LinkComponent title="Transfer" href="/transfer"/>
    </MenuComponent>
  );
};
