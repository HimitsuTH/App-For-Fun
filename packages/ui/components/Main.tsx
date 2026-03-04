"use client";
import styled from 'styled-components'

export const MainContent = styled.main`
  margin-left: var(--sidebar-width, 240px);
  margin-top: var(--navbar-height, 60px);
  min-height: calc(100vh - var(--navbar-height, 60px));
  background: var(--bg-page);
  padding: var(--page-padding, 1.75rem);
  transition: margin-left var(--transition);

  @media screen and (max-width: 768px) {
    margin-left: 64px;
    padding: 1rem;
  }
`
