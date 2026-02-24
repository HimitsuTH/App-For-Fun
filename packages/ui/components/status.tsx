"use client";

import { ReactNode } from "react";
import styled from 'styled-components'

interface StatusProps {
  children?: ReactNode;
  status?: string;
}

const StatusDot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${p => p.active ? 'var(--success, #10b981)' : '#94a3b8'};
  box-shadow: ${p => p.active ? '0 0 0 2px rgba(16,185,129,0.25)' : 'none'};
  flex-shrink: 0;
`

export const UserStatus = ({ children, status }: StatusProps) => {
  return <StatusDot active={status === 'active'}>{children}</StatusDot>
}
