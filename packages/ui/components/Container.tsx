"use client";
import { ReactNode } from "react";
import { Navbar } from './Navbar'
import { LeftSideMenu } from "./Menu";
import styled from 'styled-components'

interface ContainerProps { children: ReactNode; className?: string; }

const Wrap = styled.div`
  background: var(--bg-page);
  position: relative;
  min-height: 100vh;
`

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <Wrap className={className}>
      <Navbar />
      <LeftSideMenu />
      {children}
    </Wrap>
  );
};
