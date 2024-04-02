import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart,
  faStar,
  faUser,
  faBars,
  faUsers,
  faComments,
  faArrowLeft,
  faComment,
  faHouse,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

// Styled components
const Sidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? "0" : "-100%")};
  width: 250px;
  height: 100%;
  background-color: ${(props) => props.theme.background};
  border-right: 1px solid #fff ${(props) => props.theme.borderColor};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    display: ${(props) =>
      props.isOpen ? "block" : "none"}; /* Show or hide on mobile */
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  @media (max-width: 768px) {
    position: relative; /* Add position relative for absolute positioning of the hamburger icon on mobile */
  }
`;

const SidebarContent = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const SidebarLink = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -60px;
  cursor: pointer;
  background-color: ${(props) =>
    props.theme.background}; /* Set main background color */
  color: ${(props) => props.theme.text};

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;

const IconText = styled.h1`
  margin-left: 10px;
  font-size: 20px;
  padding-top: 100px;
  background-color: ${(props) =>
    props.theme.background}; /* Set main background color */
  color: white;
`;

const BackIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => props.theme.accent};
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 40px;
  display: none;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const Hamburger = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => props.theme.accent};

  @media (max-width: 768px) {
    display: block; /* Display the hamburger on screens <= 768px */
    position: absolute;
    top: 20px;
    left: 0px;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${(props) =>
    props.theme.background}; /* Set main background color */
  color: ${(props) => props.theme.text};
`;

const LogoInLeftBar = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 220px;

  @media (max-width: 768px) {
    right: 75px;
  }
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.accent};
  cursor: pointer;
  font-size: 16px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.accent};

  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 85px;
  }
`;

const IconSize = styled.div`
  font-size: 20px;
  margin-top: 85px;
`;

const MainNavbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      <Header>
        <Hamburger onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </Hamburger>
        <Logo>ShareSnips</Logo>
      </Header>

      <Sidebar isOpen={isSidebarOpen}>
        <SidebarContent>
          <LogoInLeftBar src={logo} alt="logo" />

          <SidebarLink>
            <IconSize>
              <FontAwesomeIcon icon={faHouse} />
            </IconSize>
            <Link to="/Homepage">
              <IconText>Home</IconText>
            </Link>
          </SidebarLink>

          {/* Additional sidebar content here */}
        </SidebarContent>
      </Sidebar>

      {/* Additional components */}
    </Container>
  );
};

export default MainNavbar;
