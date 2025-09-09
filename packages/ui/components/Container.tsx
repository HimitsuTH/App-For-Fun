"use client";

import { ReactNode } from "react";
import { Navbar } from './Navbar'

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={className}
    >
      <Navbar/>
      {children}
    </div>
  );
};
