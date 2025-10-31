import { type JSX } from "react";
import styled from "styled-components";
import Link from 'next/link';

const ButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
`

export function ButtonCustom(props: {
  title: string;
  href?: string

}): JSX.Element {
  const { title, href } = props


  return (
    <ButtonContainer>
      <Link href={href ? href : '/'} style={{padding: '0.5rem', backgroundColor: '#f3f3f3', borderRadius: '1rem'}}>{title}</Link>
    </ButtonContainer>
  );
}
