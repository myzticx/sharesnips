import React, { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowLeft,
  faHouse,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    margin: 0;
    padding: 0;
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
`;

const currentTheme = {
  background: "#000000", // black
  text: "#FFFFFF", // white
  accent: "#E1306C",
  cardBackground: "#2C2A2A",
  borderColor: "#FFFFFF",
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  @media (max-width: 768px) {
    position: relative; /* Add position relative for absolute positioning of the hamburger icon on mobile */
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

const Sidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 17px;
  left: 130px;
  width: 350px;
  height: 95%;
  background-color: rgba(255, 255, 255, 0.1);
  border-right: 1px solid #ffffff;
  transition: all 0.3s ease;
  border-radius: 5%;

  @media (max-width: 768px) {
    width: 100%;
    display: ${(props) =>
      props.isOpen ? "block" : "none"}; /* Show or hide on mobile */
  }
`;

const BackIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => props.theme.accent};
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 40px; /* Adjust margin bottom to separate it from other links */

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.accent};
  cursor: pointer;
  font-size: 16px;
`;

const SidebarContent = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  color: white;
`;

const SidebarLink = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.theme.background}; /* Set main background color */
  color: ${(props) => props.theme.text};

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;

const lightTheme = {
  background: "#ffffff", // Corrected color code for white
  text: "#333333",
  accent: "#405DE6",
  cardBackground: "#FFFFFF",
  borderColor: "#DBDBDB",
};

const darkTheme = {
  background: "#000000",
  text: "#FFFFFF",
  accent: "#E1306C",
  cardBackground: "#2C2A2A",
  borderColor: "#FFFFFF",
};

const IconText = styled.h1`
  margin-left: 10px;
  font-size: 20px;
  background-color: ${(props) =>
    props.theme.background}; /* Set main background color */
  color: ${(props) => props.theme.text};
`;

const LogoInLeftBar = styled.img`
  position: absolute;
  top: 20px; // Adjust the top position as needed
  right: 20px; // Adjust the right position as needed
  width: 220px; // Increase the width to make the image bigger

  @media (max-width: 768px) {
    right: 75px;
  }
`;

const SecondSidebarContent = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  color: white;
`;

const SecondSidebarLink = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.theme.background}; /* Set main background color */
  color: ${(props) => props.theme.text};

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;

const SecondSidebar = styled.div`
  position: fixed;
  top: 17px;
  right: 130px;
  width: 350px;
  height: 95%;
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 1px solid #ffffff;
  border-radius: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MainNavbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  const [notifications, setNotifications] = useState<string[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Container>
        <Header>
          <Hamburger onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </Hamburger>
          <Logo>ShareSnips</Logo>
          <ToggleButton onClick={toggleTheme}>Toggle Theme</ToggleButton>
        </Header>

        <Sidebar isOpen={isSidebarOpen}>
          <SidebarContent>
            <BackIcon onClick={toggleSidebar}>
              <LogoInLeftBar src={logo} alt="logo" />
              <FontAwesomeIcon icon={faArrowLeft} />
            </BackIcon>
            <SidebarLink>
              <IconSize>
                <FontAwesomeIcon icon={faHouse} />
              </IconSize>
              <Link to="/homepage">
                <IconText>Home</IconText>
              </Link>
            </SidebarLink>
            <SidebarLink>
              <FontAwesomeIcon icon={faUsers} />
              <Link to="/friends">
                <IconText>Friends</IconText>
              </Link>
            </SidebarLink>
            <SidebarLink>
              <FontAwesomeIcon icon={faUsers} />
              <Link to="/todolist">
                <IconText>To Do List</IconText>
              </Link>
            </SidebarLink>
            <SidebarLink>
              <FontAwesomeIcon icon={faUsers} />
              <Link to="/calendar">
                <IconText>Calendar</IconText>
              </Link>
            </SidebarLink>
          </SidebarContent>
        </Sidebar>
        <SecondSidebar>
          <SecondSidebarContent>
            <SecondSidebarLink>
              <FontAwesomeIcon icon={faUsers} />
              <IconText>Feed</IconText>
            </SecondSidebarLink>

            {/* Display notifications within the second sidebar */}
            {notifications.map((notification, index) => (
              <div key={index}>{notification}</div>
            ))}
          </SecondSidebarContent>
        </SecondSidebar>
      </Container>
    </ThemeProvider>
  );
};

export default MainNavbar;
