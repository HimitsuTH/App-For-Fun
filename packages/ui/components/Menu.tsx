"use client";
import { ReactNode } from "react";
import { LinkComponent } from "./Link";

import styled from 'styled-components'

export const MenuComponent = styled.div`
  overflow: hidden;
  margin-top: 4.5em;
  padding: 2em;
  position: fixed;
  display: grid;
  grid-template-rows: 4em 1fr auto;
  grid-gap: 2em;
  background-color: #fff;
  width: 200px;
  height: 100vh;
  padding-bottom: 1em;
  box-sizing: border-box;
  font-size: inherit;
  top: 0;
  left: 0;
  z-index: 302;

  z-index: 2;
  transition: all ease 0.2s;
`

export const ListMenuConent = styled.ul`
  list-style-type: none;
`

export const MenuTitle = styled.p`
  color: #000;
  font-weigth: 800;
  text-decoration: underline;
  pointer-events: none;
`

export const SubMenuContainer = styled.div`

`


interface MenuProps {
  children?: ReactNode;
  className?: string;
}



export const LeftSideMenu = ({ children, className }: MenuProps) => {
  return (
    <MenuComponent className={`${className}`}>
        <SubMenuContainer>
          <MenuTitle>Expenses</MenuTitle>
          <ListMenuConent>
            <li>
              <LinkComponent title="Expenses list" href="/expenses"/>
            </li>
          </ListMenuConent>
        </SubMenuContainer>
        <SubMenuContainer>
          <MenuTitle>Category</MenuTitle>
          <ListMenuConent>
            <li>
              <LinkComponent title="Create" href="/category"/>
            </li>
          </ListMenuConent>
        </SubMenuContainer>

    </MenuComponent>
  );
};
