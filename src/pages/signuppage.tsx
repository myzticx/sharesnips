import React, { useState } from "react";
import styled from "styled-components";

interface SignUpFormProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.div`
  background: linear-gradient(to bottom, black, red);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  background-color: #444;
  color: #fff;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: pink;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff69b4;
  }
`;

const SignUpForm: React.FC<SignUpFormProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    // Your sign-up logic goes here
    // For demonstration purposes, let's just log the input values
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    // After successful sign-up, you may want to redirect the user to the homepage or log them in automatically
    // For example:
    // setIsLoggedIn(true);
  };

  return (
    <Container>
      <FormContainer>
        <Title>Sign Up</Title>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <Button onClick={handleSignUp}>Sign Up</Button>
      </FormContainer>
    </Container>
  );
};

export default SignUpForm;
