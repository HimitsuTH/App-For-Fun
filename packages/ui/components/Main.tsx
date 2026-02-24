"use client";

import styled from 'styled-components'

export const MainContent = styled.main`
  margin-left: var(--sidebar-width, 40px);
  margin-top: var(--navbar-height, 20px);
  min-height: calc(100vh - var(--navbar-height, 60px));
  background-color: var(--bg-base, #f5f6fa);
  padding: 1.5rem 2rem;
  transition: margin-left 0.2s ease;

  @media screen and (max-width: 768px) {
    margin-left: 64px;
    padding: 1rem;
  }
`
