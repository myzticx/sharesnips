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
import { useLocation } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { ApiResponse } from "./types/api";
import PremiumBusinessCard from "./pages/businesscards";
const API_URL = "https://0a71-77-102-79-98.ngrok-free.app/";

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
  const location = useLocation();
  const { data, loading, error } = useFetch<ApiResponse>(API_URL);

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

  // Display backend data (for demonstration)
  useEffect(() => {
    if (data) {
      console.log("Backend data:", data);
      // You can use this data anywhere in your app
      // For example: toast.success(data.message);
    }
    if (error) {
      console.error("Backend error:", error);
      toast.error("Failed to connect to backend");
    }
  }, [data, error]);

  return (
    <div className="App">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />

      {location.pathname !== "/" && (
        <>
          <NavbarContainer>
            <MainNavbar />
          </NavbarContainer>
          <MobileNavbarContainer>
            <MobileNavbar />
          </MobileNavbarContainer>
        </>
      )}

      {/* Optional: Display backend message (example) */}
      {data?.message && (
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            background: "#f0f0f0",
          }}
        >
          Backend Status: {data.message}
        </div>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/homepage"
          element={
            isLoggedIn ? (
              <HomePage backendData={data} />
            ) : (
              <Navigate to="/signup" replace={true} />
            )
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
          path="/businesscards"
          element={
            isLoggedIn ? (
              <PremiumBusinessCard />
            ) : (
              <Navigate to="/signup" replace={true} />
            )
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
