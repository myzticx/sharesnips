import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Friends from "./pages/friends";
import NotSignedInPage from "./pages/notsignedin";
import MyAccount from "./pages/myaccount";
import { ToDo } from "./pages/todolist";
import Calendar from "./pages/calendar";
import LoginForm from "./pages/signup";
import SearchPage from "./mobile/search";
import HomePage from "./pages/homepage";
import SignUpForm from "./pages/signuppage";
import toast, { Toaster } from "react-hot-toast";
import MainNavbar from "./components/MainNavbar";
import MobileNavbar from "./components/MobileNavbar";

const NavbarContainer = styled.div`
  @media (min-width: 1024px) {
    display: block;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;

const MobileNavbarContainer = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
  @media (max-width: 1023px) {
    display: block;
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (rememberMe === "true" && isLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("rememberMe");
  };

  return (
    <div className="App">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
      <NavbarContainer>
        <MainNavbar />
      </NavbarContainer>
      <MobileNavbarContainer>
        <MobileNavbar />
      </MobileNavbarContainer>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <HomePage /> : <Navigate to="/signup" replace={true} />
          }
        />
        <Route
          path="/signup"
          element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/homepage"
          element={
            isLoggedIn ? <HomePage /> : <Navigate to="/signup" replace={true} />
          }
        />
        <Route
          path="/friends"
          element={
            isLoggedIn ? <Friends /> : <Navigate to="/signup" replace={true} />
          }
        />
        <Route
          path="/todolist"
          element={
            isLoggedIn ? <ToDo /> : <Navigate to="/signup" replace={true} />
          }
        />
        <Route
          path="/search"
          element={
            isLoggedIn ? (
              <SearchPage />
            ) : (
              <Navigate to="/signup" replace={true} />
            )
          }
        />
        <Route
          path="/calendar"
          element={
            isLoggedIn ? <Calendar /> : <Navigate to="/signup" replace={true} />
          }
        />
        <Route
          path="/myaccount"
          element={
            isLoggedIn ? (
              <MyAccount username="" email="" onLogout={handleLogout} />
            ) : (
              <Navigate to="/signup" replace={true} />
            )
          }
        />
        <Route
          path="*"
          element={!isLoggedIn && <Navigate to="/signup" replace={true} />}
        />
      </Routes>
    </div>
  );
}

export default App;
