"use client";

import { ReactNode } from "react";
import { Navbar } from './Navbar'
import { LeftSideMenu } from "./Menu";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}


import styled from 'styled-components'

export const Content = styled.div`
  overflow: hidden;
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  height: 100%;

  z-index: 2;
  transition: all ease 0.2s;
`



export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={className} style={{backgroundColor: '#F7F7F7', position: 'relative'}} 
    > 
      <Navbar/>
      <Content>
        <LeftSideMenu/>
        {children}
      </Content>
    </div>
  );
};
