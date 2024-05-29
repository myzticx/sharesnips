import React from "react";
import styled from "styled-components";

interface MyAccountProps {
  username: string;
  email: string;
  onLogout: () => void;
}

const MyAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Greeting = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Username = styled.p`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Email = styled.p`
  font-size: 18px;
  color: #666666;
`;

const MyAccount: React.FC<MyAccountProps> = ({ username, email, onLogout }) => {
  return (
    <MyAccountContainer>
      <Greeting>Hello, {username}</Greeting>
      <UserInfo>
        <Username>{username}</Username>
        <Email>{email}</Email>
        {/* Additional user information or actions can be added here */}
      </UserInfo>
    </MyAccountContainer>
  );
};

export default MyAccount;
