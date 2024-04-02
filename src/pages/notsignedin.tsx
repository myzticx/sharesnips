import React from "react";
import styled from "styled-components";

const NotSignedInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const SignInButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #405de6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SignUpButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3f9d28;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const NotSignedInPage: React.FC = () => {
  const handleSignIn = () => {
    // Handle sign-in action, e.g., redirect to sign-in page
  };

  const handleSignUp = () => {
    // Handle sign-up action, e.g., redirect to sign-up page
  };

  return (
    <NotSignedInContainer>
      <Title>You are not signed in</Title>
      <ButtonContainer>
        <SignInButton onClick={handleSignIn}>Sign In</SignInButton>
        <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
      </ButtonContainer>
    </NotSignedInContainer>
  );
};

export default NotSignedInPage;
