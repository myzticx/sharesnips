import React, { useState } from "react";
import styled from "styled-components";
import logo from "../images/logo.png";

// Styled components
const NavbarContainer = styled.nav`
  background-color: none;
  border: 1px solid #565656;
  margin-top: -10px;
  color: white;
  padding: 1rem;

  @media (max-width: 1709px) or (max-height: 873px) {
    background-color: #0d1117;
  }
`;

const Image = styled.img`
  width: 12%;
  margin-top: 20px;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin-left: 77%;
  margin-top: -3%;

  @media (max-width: 1503px) or (max-height: 873px) {
    margin-left: 74%;
  }
`;

const NavItem = styled.li`
  margin-left: 2rem;
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgb(225, 48, 108);
  padding: 0.5rem;
  border-radius: 4px;

  @media (max-width: 1503px) or (max-height: 873px) {
    left: -20px;
  }
`;

const DropdownItem = styled.a`
  color: white;
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// Example usage
const Navbar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <NavbarContainer>
      <Image src={logo} />
      <NavList>
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>
          <Dropdown>
            <DropdownButton onClick={toggleDropdown}>Services</DropdownButton>
            <DropdownContent isOpen={isDropdownOpen}>
              <DropdownItem href="#">How to share a snippet</DropdownItem>
              <DropdownItem href="#">
                How to like and favourite snippets
              </DropdownItem>
              <DropdownItem href="#">How to comment on snippets</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </NavItem>
        <NavItem>Contact</NavItem>
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;
