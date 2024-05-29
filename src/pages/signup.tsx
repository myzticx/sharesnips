import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface LoginFormProps {
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

const GuestButton = styled(Button)`
  background-color: transparent;
  border: 2px solid pink;
`;

const HiddenLink = styled(Link)`
  display: none;
`;

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (username === "myzticx" && password === "superiorpass") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
      // Programmatically click the hidden link to redirect
      setTimeout(() => {
        document.getElementById("redirectLink")?.click();
      }, 0);
    } else {
      setError("Invalid username or password");
    }
  };

  const handleGuestLogin = () => {
    setUsername("SnippyGuest");
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
    // Programmatically click the hidden link to redirect
    setTimeout(() => {
      document.getElementById("redirectLink")?.click();
    }, 0);
  };

  const handleSignUp = () => {
    console.log("Redirecting to sign-up page...");
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <Container>
      <FormContainer>
        <Title>Log In</Title>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          Remember Me
        </label>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <Button onClick={handleLogin}>Log In</Button>
        <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
          Or
        </p>
        <GuestButton onClick={handleGuestLogin}>Continue as Guest</GuestButton>
        <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
          Don't have an account?{" "}
          <a href="#" style={{ color: "pink" }} onClick={handleSignUp}>
            Sign up
          </a>
        </p>
        {/* Hidden link for redirection */}
        <HiddenLink id="redirectLink" to="/homepage" />
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
