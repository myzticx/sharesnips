import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

const MainText = styled.h1`
  font-size: 34px;
  font-family: Monospace, sans-serif;

  @media (max-width: 768px) {
    font-size: 68px;
  }
`;

const LinkText = styled.h1`
  color: white;
`;

const StyledButton = styled.button`
  padding: 10px;
  border-radius: 20px;
  background-color: #e1306c;
  color: #fff;
`;

const ExampleBox = styled.div`
  background-color: #2c2a2a;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 30px;
  border: 1px solid #ffffff;
  width: 100%; /* Use full width on mobile */
  max-width: 1050px; /* Limit width on larger screens */
  margin-left: 100px;
  margin-right: auto;
  height: 200px;

  @media (max-width: 768px) {
    margin-left: 60px;
    height: 450px;
    width: 100%;
  }
`;

const ExampleBoxContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MobileStyledButton = styled(StyledButton)`
  width: 100%; /* Make button full width on mobile */
`;

const examplebox: React.FC = () => {
  return (
    <ExampleBox>
      <ExampleBoxContent>
        <MainText>
          Hello World! This is an example of a ShareSnips Snippet!
        </MainText>
        <MobileStyledButton>
          <Link to="/homepage">
            <LinkText>Begin Interacting with Posts</LinkText>
          </Link>
        </MobileStyledButton>
      </ExampleBoxContent>
    </ExampleBox>
  );
};

export default examplebox;
