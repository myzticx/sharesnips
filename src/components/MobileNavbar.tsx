import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faStar,
  faMagnifyingGlass,
  faCalendar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const MobileNavContainer = styled.div`
  display: none; // Hide by default
  @media (max-width: 768px) {
    // Adjust the max-width as per your mobile breakpoint
    display: flex; // Show on mobile devices
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: #2c2a2a;
    padding: 10px 0;
    position: fixed;
    bottom: 0;
  }
`;

const NavButton = styled.div`
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: 1;
`;

const MobileNavbar = () => {
  return (
    <MobileNavContainer>
      <NavButton>
        <FontAwesomeIcon icon={faHouse} />
      </NavButton>
      <NavButton>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </NavButton>
      <NavButton>
        <FontAwesomeIcon icon={faUsers} />
      </NavButton>
      <NavButton>
        <FontAwesomeIcon icon={faCalendar} />
      </NavButton>
      <NavButton>
        <FontAwesomeIcon icon={faUser} />
      </NavButton>
    </MobileNavContainer>
  );
};

export default MobileNavbar;
