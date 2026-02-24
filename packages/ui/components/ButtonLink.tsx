import { type JSX } from "react";
import styled from "styled-components";
import Link from 'next/link';

// Define a union type for the possible button styles
type ButtonType = 'create' | 'default';

// --- Styled Components ---

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

// Create a helper function to determine colors based on the type prop
const getColor = (props: { buttontype: ButtonType }) => {
  if (props.buttontype === 'create') {
    return {
      background: '#00db21', // Green for 'create'
      hover: '#018014',
      active: '#004c99', // Keep the active blue as it is
      color: 'white',
    };
  }
  // Default type
  return {
    background: '#e3e3e3', // Light gray for 'default'
    hover: '#d3d3d3',
    active: '#c3c3c3',
    color: '#333', // Dark text for light background
  };
};

// Pass the 'buttonType' prop to the StyledLink
const StyledLink = styled(Link)<{ buttontype: ButtonType }>`
  /* Visual Styles - Use helper function to set colors */
  background-color: ${props => getColor(props).background};
  color: ${props => getColor(props).color};
  
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  
  /* Transition for hover effect */
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-out;

  /* Hover effect */
  &:hover {
    background-color: ${props => getColor(props).hover};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* Active/Click effect */
  &:active {
    transform: translateY(0);
    background-color: ${props => getColor(props).active};
    box-shadow: none;
  }
`;

// --- Component Definition ---

export function ButtonCustom(props: {
  title: string;
  href?: string;
  // Add the new prop with a default value
  type?: ButtonType 
}): JSX.Element {
  // Destructure props, setting 'default' if 'type' is not provided
  const { title, href, type = 'default' } = props;

  return (
    <ButtonContainer>
      {/* Pass the type prop to the styled component */}
      <StyledLink 
        href={href || '/'}
        buttontype={type}
      >
        {title}
      </StyledLink>
    </ButtonContainer>
  );
}