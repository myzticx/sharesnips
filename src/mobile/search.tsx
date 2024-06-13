import React from "react";
import styled from "styled-components";
import MainNavbar from "../components/MainNavbar";
import MobileNavbar from "../components/MobileNavbar";
import searchimage from "../images/searchimg.png";

// Container for the entire search page
const SearchPageContainer = styled.div`
  height: 100vh; /* Full height */
  display: flex;
  flex-direction: column; /* Make the content stack vertically */
  align-items: center;
  justify-content: top;
  background-color: #000000;
`;

// Container for the search bar
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px; /* Adjust the margin between lines */
`;

// Styling for the search input
const SearchBar = styled.input`
  flex: 1; /* Take remaining space */
  padding: 12px 90px; /* Adjust the padding for height and width */
  border-radius: 20px; /* Curved edges */
  border: 1px solid #ccc; /* Add a border for visibility */
  color: #000000; /* Text color */
  background-color: #fff; /* Background color */
`;

// Styling for the search button
const SearchButton = styled.button`
  margin-left: 10px; /* Create space between bar and button */
  background-color: #e1306c; /* Button background color */
  color: #fff; /* Text color */
  padding: 12px 24px; /* Adjust the padding for height and width */
  border: none;
  border-radius: 20px; /* Curved edges */
  cursor: pointer;

  &:hover {
    background-color: #000000; /* Change background color on hover */
  }
`;

// Styled component for the image
const StyledImage = styled.img`
  margin-top: 10px;
  height: 170px; /* Adjust height as needed */
  width: auto; /* Keep aspect ratio */
  margin-bottom: 20px; /* Space below the image */
`;

// The search page component
const SearchPage = () => {
  return (
    <SearchPageContainer>
      <StyledImage src={searchimage} alt="Search" />
      <SearchContainer>
        <SearchBar type="text" placeholder="Search for code snippets..." />
        <SearchButton>Search</SearchButton>
      </SearchContainer>
      <MobileNavbar />
    </SearchPageContainer>
  );
};

export default SearchPage;
