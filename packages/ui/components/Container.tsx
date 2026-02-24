"use client";

import { ReactNode } from "react";
import { Navbar } from './Navbar'
import { LeftSideMenu } from "./Menu";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}


import styled from 'styled-components'

export const ContentContainer = styled.div`
  overflow: hidden;
  margin-left: 200px;
  padding: 2em;
  box-sizing: border-box;
  margin-top: 2.5em;
  gap: 0.5rem;

  z-index: 2;
  transition: all ease 0.2s;

  @media (max-width: 768px) {
    margin-left: 100px;
    margin-top: 3.5em;
    padding: 1em;
  }
`



export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={className} style={{backgroundColor: '#F7F7F7', position: 'relative'}} 
    > 
      <Navbar/>
      <LeftSideMenu/>
      <ContentContainer>
        {children}
      </ContentContainer>
    </div>
  );
};
