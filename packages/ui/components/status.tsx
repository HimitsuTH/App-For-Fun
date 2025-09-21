"use client";

import { ReactNode } from "react";

import styled from 'styled-components'

interface StatusProps {
  children?: ReactNode;
  status?: string;
}

export const UserStatus = ({ children, status }: StatusProps) => {

    const Status = styled.div`
    overflow: hidden;
    padding: 0.25rem;
    border-radius: 50%;
    background-color: ${status === 'active' ? "#1dc204": "#7d7d7d"}
    `
  return (
    <Status>{children}</Status>
  );
};
