import { type JSX } from "react";
import Link from 'next/link';
import styled from 'styled-components'


interface LinkProps {
  title: string;
  href?: string;
}


export const LinkContainer =  styled.div`
    position: relative;
    padding: 0.5rem;
    width: 250px;
`



export const LinkComponent = ({title, href}:LinkProps): JSX.Element => {
  return (
    <LinkContainer><Link href={href ? href : '/'}  style={{backgroundColor: '#F7F7F7', padding: '0.5rem', width: '100%'}}>{title}</Link></LinkContainer>
  )
}