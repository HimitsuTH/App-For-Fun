import { type JSX } from "react";
import Link from 'next/link';
import styled, { css } from 'styled-components'

interface IconProps {
  initial: string;
}

// Placeholder Icon Component
const HomeIcon = () => <span>🏠</span>;
const MenuIcon = ( { initial }: IconProps) => <span>{initial}</span>; 

interface LinkProps {
  title: string;
  href?: string;
  isHome?: boolean;
}

interface LinkContainerProps {
  isHome: boolean;
}

// Styles specifically for the non-home (Menu) link
const menuLinkStyles = css`
    background-color: #F7F7F7;
    border-radius: 20px;
    width: 100%;
    font-size: 14px;
    
    /* 💥 Hover Effect for Menu Link 💥 */
    &:hover {
        background-color: #e0e0e0; /* Darker gray on hover */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle lift effect */
        transform: translateY(-1px); /* Slight upward shift */
        transition: all 0.2s ease-in-out; 
    }
`;

export const LinkContainer = styled.div<LinkContainerProps>`
    position: relative;
    padding: 0.5rem;

    /* Target the Next.js Link component (the actual "button") */
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      
      width: 100%;
      text-decoration: none;
      color: #333;
      border: 1px solid #E0E0E0;
      cursor: pointer;
      
      /* Apply menu styles if not home */
      ${props => !props.isHome && menuLinkStyles}
    }

    /* Conditional Styling for the Home link */
    ${props => props.isHome && css`
      /* Container background and border for Home */
      // background-color: #e6f7ff; 
      width: 200px;
      
      a {
        font-weight: bold;
        color: #1890ff;
        background-color: transparent;
        border: none;
        
        /* 💥 Hover Effect for Home Link 💥 */
        &:hover {
            background-color: #d9f0ff; /* Lighter blue hover for Home */
            transition: background-color 0.2s ease-in-out;
        }
      }
    `}

    /* Responsive styles for title/icon toggle */
    @media (max-width: 768px) {
      width: 50px;
      padding: 0.5rem 0.25rem;
    }
`;


// (LinkTitle and LinkIcon remain the same)
const LinkTitle = styled.span`
  display: block; 
  @media (max-width: 768px) {
    display: none;
  }
`;

const LinkIcon = styled.span`
  display: none; 
  @media (max-width: 768px) {
    display: block;
    font-size: 1rem;
  }
`;


export const LinkComponent = ({title, href, isHome = false}: LinkProps): JSX.Element => {
  const icon = isHome ? <HomeIcon /> : <MenuIcon initial={title[0]} />;

  return (
    // The hover effect is applied via the $isHome prop check in the styled-component
    <LinkContainer isHome={isHome}>
      <Link href={href ? href : '/'}>
        <LinkTitle>{title}</LinkTitle>
        <LinkIcon>{icon}</LinkIcon>
      </Link>
    </LinkContainer>
  )
}