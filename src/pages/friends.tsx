import React from "react";
import styled from "styled-components";
import MainNavbar from "../components/MainNavbar";

const Background = styled.div`
  background-color: #000;
  padding: 10px;
  padding-bottom: 40.6%;
`;

const MainText = styled.h1`
  color: white;
  text-align: center;
  font-size: 2em;
  font-weight: 400;
`;

const friends = () => {
  return (
    <Background>
      <MainNavbar />
      <MainText>
        You do not have any friends yet. Please send a friend request or go to
        the discovery tab.
      </MainText>
    </Background>
  );
};

export default friends;
