import React, { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Resizable } from "react-resizable";
import {
  faHeart,
  faStar,
  faUser,
  faBars,
  faUsers,
  faComments,
  faArrowLeft,
  faComment,
  faHouse,
  faBell,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import MobileNavbar from "../components/MobileNavbar";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import friends from "./friends";
import FavoritesPage from "../components/media/favourited";
import MainNavbar from "../components/MainNavbar";
import { ApiResponse } from "../types/api";

type HomePageProps = {
  backendData?: ApiResponse | null; // Make it optional if not always required
};

function generateGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

console.log(generateGUID());

type Language = "html" | "css" | "javascript" | "typescript" | "tsx" | "text";

// Update the detectLanguage function to return the Language type
export const detectLanguage = (code: string): Language => {
  const trimmedCode = code.trim().replace(/\r\n/g, "\n");

  // HTML detection
  if (/<[a-z][\s\S]*>/i.test(trimmedCode)) {
    if (
      /<!DOCTYPE html>|<\/?(html|head|body|div|p|span)[\s>]/i.test(trimmedCode)
    ) {
      return "html";
    }
    if (/<\/?[A-Z][a-zA-Z]*[\s>]|{[^}]*}/.test(trimmedCode)) {
      return "tsx";
    }
    return "html";
  }

  // CSS detection
  if (
    /^[^{]*\{[^}]*\}/.test(trimmedCode) &&
    /(color|margin|padding|font|width|height):[^;]*;/.test(trimmedCode)
  ) {
    return "css";
  }

  // JavaScript/TypeScript detection
  if (
    /(^|\s)(function|const|let|var|interface|type)\s/.test(trimmedCode) ||
    /=>|import\s|export\s/.test(trimmedCode)
  ) {
    if (/<\/?[A-Z][a-zA-Z]*>|React\./.test(trimmedCode)) {
      return "tsx";
    }
    if (
      /:\s*(string|number|boolean|any)\s*[;=]|interface\s|type\s/.test(
        trimmedCode
      )
    ) {
      return "typescript";
    }
    return "javascript";
  }

  // Default to text if no matches
  return "text";
};

interface CodeSnippet {
  id: string;
  code: string;
  language: Language; // Now using our defined type
  likes: number;
  liked: boolean;
  favorited: boolean;
  comments: {
    count: number;
    list: string[];
  };
  showCommentSection: boolean;
  timestamp: number; // Added timestamp for sorting/filtering
}

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end; /* Align content to the right */
  align-items: center;
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const Header2 = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
  position: relative; /* Position relative for absolute positioning of profile icon */
  background-color: #262626;
`;

const ProfileIcon = styled.div`
  position: absolute;
  top: 20px; /* Adjust this value for the desired vertical position */
  right: 20px; /* Adjust this value for the desired horizontal position */
`;

const ProfileIconLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BackIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => props.theme.accent};
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 40px; /* Adjust margin bottom to separate it from other links */

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const SidebarContent = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  color: white;
`;

const SidebarLink = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.theme.background}; /* Set main background color */
  color: ${(props) => props.theme.text};

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;

const IconText = styled.h1`
  margin-left: 10px;
  font-size: 20px;
  background-color: ${(props) =>
    props.theme.background}; /* Set main background color */
  color: ${(props) => props.theme.text};
`;

const lightTheme = {
  background: "#ffffff", // Corrected color code for white
  text: "#333333",
  accent: "#405DE6",
  cardBackground: "#FFFFFF",
  borderColor: "#DBDBDB",
};

const darkTheme = {
  background: "#000000",
  text: "#FFFFFF",
  accent: "#E1306C",
  cardBackground: "#2C2A2A",
  borderColor: "#FFFFFF",
};

// Global styles
const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    margin: 0;
    padding: 0;
  }
  `;

// Styled components for your elements
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${(props) =>
    props.theme.background}; /* Set main background color */
  color: ${(props) => props.theme.text};
`;

const SnippetId = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.text};
  opacity: 0.7;
`;

const CodeSnippetCard = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  position: relative; // Add this to make absolute positioning work for child elements
`;

const Hamburger = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => props.theme.accent};

  @media (max-width: 768px) {
    display: none; /* Display the hamburger on screens <= 768px */
    position: absolute;
    top: 20px;
    left: 0px;
  }
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? "0" : "-100%")};
  width: 250px;
  height: 100%;
  background-color: ${(props) => props.theme.background};
  border-right: 1px solid ${(props) => props.theme.borderColor};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    display: ${(props) =>
      props.isOpen ? "block" : "none"}; /* Show or hide on mobile */
  }
`;

const PreCode = styled.pre`
  font-size: 14px;
  border-radius: 4px;
  overflow: auto;
  word-wrap: break-word; /* Ensures long words break and wrap */
  white-space: pre-wrap; /* Preserves white spaces and line breaks */
  & > code[class*="language-"] {

  & > div {
    background-color: #f0f0f0; /* Example color for div */
    padding: 4px;
    margin-bottom: 4px;
    border-radius: 4px;
  }
`;

const LikeButton = styled.button<{ liked: boolean }>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 8px;
  color: ${(props) => (props.liked ? props.theme.accent : props.theme.text)};
  @media (max-width: 768px) {
    margin-right: 2px;
  }
`;

const FavoriteButton = styled.button<{ favorited: boolean }>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.favorited ? props.theme.accent : props.theme.text};
`;

const CommentButton = styled.button<{ commented: boolean }>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 8px;
  color: ${(props) =>
    props.commented ? props.theme.accent : props.theme.text};
`;

const ShareBox = styled.div`
  background-color: ${(props) =>
    props.theme.cardBackground}; /* Set share box background */
  color: ${(props) => props.theme.text};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Input = styled.input`
  width: 100%;
  height: 100px; /* Adjust height for better visibility on mobile */
  resize: vertical;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const PostButton = styled.button`
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.text};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const PreviewContainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  background-color: white;
  color: black;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  @media (max-width: 768px) {
    position: relative; /* Add position relative for absolute positioning of the hamburger icon on mobile */
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.accent};

  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 5px;
  }
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.accent};
  cursor: pointer;
  font-size: 16px;
`;

const CommentInput = styled.input`
  width: calc(100% - 70px); /* Adjust width as needed */
  padding: 10px;
  border-radius: 20px; /* Rounded edges */
  border: 1px solid #ccc; /* Example border color */
  margin-bottom: 10px;
  outline: none; /* Remove outline on focus */
`;

const LanguageButton = styled.button`
  border-radius: 5px;
  color: white;
`;

const SendButton = styled.button`
  background-color: #4caf50; /* Nice color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px; /* Rounded edges */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition */

  &:hover {
    background-color: #45a049; /* Darker shade on hover */
  }
`;

const CommentBox = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
`;

const LanguageTag = styled.span<{ language: Language }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 10px;
  background-color: ${(props) => {
    switch (props.language) {
      case "html":
        return "#e34c26";
      case "css":
        return "#264de4";
      case "javascript":
        return "#f0db4f";
      case "typescript":
        return "#007acc";
      case "tsx":
        return "#61dafb";
      default:
        return "#666";
    }
  }};
  color: ${(props) => (props.language === "javascript" ? "black" : "white")};
`;

const FilterButton = styled.button<{ active: boolean }>`
  margin: 5px;
  padding: 5px 10px;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.accent};
  background-color: ${(props) =>
    props.active ? props.theme.accent : "transparent"};
  color: ${(props) =>
    props.active ? props.theme.background : props.theme.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.accent};
    color: ${(props) => props.theme.background};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
`;

const getHeartIcon = (liked: boolean) => (liked ? faHeart : farHeart);
const getStarIcon = (favorited: boolean) => (favorited ? faStar : farStar);

const CodeSnippetsList: React.FC<{ snippets: CodeSnippet[] }> = ({
  snippets,
}) => {
  const [snippetList, setSnippetList] = useState<CodeSnippet[]>(snippets);
  const [commentInput, setCommentInput] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const [filter, setFilter] = useState<Language | "all">("all");

  const setLoggedInUsername = (name: string) => {
    setUsername(name);
  };

  useEffect(() => {
    setSnippetList(snippets);
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [snippets]);

  const canPreview = (code: string, language: Language) => {
    return language === "html" && /<[a-z][\s\S]*>/i.test(code);
  };

  const renderPreview = (code: string) => {
    return (
      <PreviewContainer>
        <div dangerouslySetInnerHTML={{ __html: code }} />
      </PreviewContainer>
    );
  };

  const handleComment = (id: string) => {
    const updatedSnippets = snippetList.map((snippet) => {
      if (snippet.id === id) {
        return {
          ...snippet,
          showCommentSection: !snippet.showCommentSection,
        };
      }
      return snippet;
    });
    setSnippetList(updatedSnippets);
  };

  const getTimeDifference = (timestamp: number): string => {
    const secondsDifference = Math.floor(
      (currentTime.getTime() - timestamp) / 1000
    );

    if (secondsDifference < 60) {
      return `${secondsDifference} seconds ago`;
    } else if (secondsDifference < 3600) {
      const minutesDifference = Math.floor(secondsDifference / 60);
      return `${minutesDifference} minute${
        minutesDifference !== 1 ? "s" : ""
      } ago`;
    } else if (secondsDifference < 86400) {
      const hoursDifference = Math.floor(secondsDifference / 3600);
      return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
    } else if (secondsDifference < 31536000) {
      const daysDifference = Math.floor(secondsDifference / 86400);
      return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
    } else {
      const yearsDifference = Math.floor(secondsDifference / 31536000);
      return `${yearsDifference} year${yearsDifference !== 1 ? "s" : ""} ago`;
    }
  };

  const handleLike = (id: string) => {
    const updatedSnippets = snippetList.map((snippet) => {
      if (snippet.id === id) {
        const newNotification = `Your post has received a like!`;
        toast.success(newNotification);
        return {
          ...snippet,
          liked: !snippet.liked,
          likes: snippet.liked ? snippet.likes - 1 : snippet.likes + 1,
        };
      }
      return snippet;
    });
    setSnippetList(updatedSnippets);
  };

  const handleAddComment = (id: string) => {
    const updatedSnippets = snippetList.map((snippet) => {
      if (snippet.id === id && commentInput.trim() !== "") {
        const newComment = `${username}: ${commentInput}`;
        const updatedCommentsList = [...snippet.comments.list, newComment];
        toast.success("Comment posted successfully!");
        return {
          ...snippet,
          comments: {
            ...snippet.comments,
            count: snippet.comments.count + 1,
            list: updatedCommentsList,
          },
          showCommentSection: true,
        };
      }
      return snippet;
    });
    setSnippetList(updatedSnippets);
    setCommentInput("");
  };

  const handleFavorite = (id: string) => {
    const updatedSnippets = snippetList.map((snippet) => {
      if (snippet.id === id) {
        const message = snippet.favorited
          ? "Removed from favorites"
          : "Added to favorites";
        toast.success(message);
        return { ...snippet, favorited: !snippet.favorited };
      }
      return snippet;
    });
    setSnippetList(updatedSnippets);
  };

  const filteredSnippets =
    filter === "all"
      ? snippetList
      : snippetList.filter((snippet) => snippet.language === filter);

  return (
    <div>
      <FilterContainer>
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All Languages
        </FilterButton>
        <FilterButton
          active={filter === "html"}
          onClick={() => setFilter("html")}
        >
          HTML
        </FilterButton>
        <FilterButton
          active={filter === "css"}
          onClick={() => setFilter("css")}
        >
          CSS
        </FilterButton>
        <FilterButton
          active={filter === "javascript"}
          onClick={() => setFilter("javascript")}
        >
          JavaScript
        </FilterButton>
        <FilterButton
          active={filter === "typescript"}
          onClick={() => setFilter("typescript")}
        >
          TypeScript
        </FilterButton>
        <FilterButton
          active={filter === "tsx"}
          onClick={() => setFilter("tsx")}
        >
          TSX
        </FilterButton>
        <FilterButton
          active={filter === "text"}
          onClick={() => setFilter("text")}
        >
          Text
        </FilterButton>
      </FilterContainer>

      {filteredSnippets.map((snippet) => (
        <CodeSnippetCard key={snippet.id}>
          <SnippetId>ID: {snippet.id}</SnippetId>
          {canPreview(snippet.code, snippet.language) && (
            <>
              <h4>Preview:</h4>
              {renderPreview(snippet.code)}
            </>
          )}
          <div>
            <PreCode>{snippet.code}</PreCode>
            <LanguageTag language={snippet.language}>
              {snippet.language.toUpperCase()}
            </LanguageTag>
          </div>
          <LikeButton
            liked={snippet.liked}
            onClick={() => handleLike(snippet.id)}
          >
            <FontAwesomeIcon
              icon={getHeartIcon(snippet.liked)}
              style={{ color: snippet.liked ? "#ff0000" : "inherit" }}
            />
            {snippet.likes} Likes
          </LikeButton>
          <FavoriteButton
            favorited={snippet.favorited}
            onClick={() => handleFavorite(snippet.id)}
          >
            <FontAwesomeIcon
              icon={getStarIcon(snippet.favorited)}
              style={{ color: snippet.favorited ? "#ffd700" : "inherit" }}
            />
            {snippet.favorited ? "Favorited" : "Favorite"}
          </FavoriteButton>
          <CommentButton
            onClick={() => handleComment(snippet.id)}
            commented={snippet.comments.count > 0}
          >
            <FontAwesomeIcon icon={faComment} />
            {snippet.comments.count > 0
              ? `${snippet.comments.count} Comments`
              : "Comment"}
          </CommentButton>
          {snippet.showCommentSection && (
            <CommentBox>
              {snippet.comments.list.map((comment, index) => (
                <div key={index}>{comment}</div>
              ))}
              <CommentInput
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <SendButton onClick={() => handleAddComment(snippet.id)}>
                Send
              </SendButton>
            </CommentBox>
          )}
        </CodeSnippetCard>
      ))}
    </div>
  );
};

const BellIcon = styled.div`
  position: relative;
  cursor: pointer;
`;

const BellNotification = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px; /* Adjust the margin between lines */
`;

const SearchBar = styled.input`
  flex: 1; /* Take remaining space */
  padding: 12px 16px; /* Adjust the padding for height and width */
  border-radius: 20px; /* Curved edges */
  border: 1px solid #ccc; /* Add a border for visibility */
`;

const SearchButton = styled.button`
  margin-left: 10px; /* Create space between bar and button */
  background-color: pink;
  color: white;
  padding: 12px 24px; /* Adjust the padding for height and width */
  border: none;
  border-radius: 20px; /* Curved edges */
  cursor: pointer;
`;

const SecondSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: ${(props) =>
    props.theme.background}; /* Set second sidebar background */
  border-left: 1px solid ${(props) => props.theme.borderColor};
  @media (max-width: 768px) {
    display: none;
  }
`;

const IconSize = styled.div`
  font-size: 20px;
`;

const SecondSidebarContent = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  color: white;
`;

const SecondSidebarLink = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.theme.background}; /* Set main background color */
  color: ${(props) => props.theme.text};

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;

const LogoInLeftBar = styled.img`
  position: absolute;
  top: 20px; // Adjust the top position as needed
  right: 20px; // Adjust the right position as needed
  width: 220px; // Increase the width to make the image bigger

  @media (max-width: 768px) {
    right: 75px;
  }
`;

const ShareSnipsBox = styled.div`
  background-color: #333; /* Dark grey background color */
  color: white; /* Text color */
  border-radius: 10px; /* Curved edges */
  padding: 20px; /* Padding inside the box */
  margin-bottom: 20px; /* Margin to separate from other elements */
`;

export default function HomePage({ backendData }: HomePageProps) {
  const [snippetInput, setSnippetInput] = useState("");
  const [postedSnippets, setPostedSnippets] = useState<CodeSnippet[]>([]);
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [favoritedSnippets, setFavoritedSnippets] = useState<CodeSnippet[]>([]);
  const [username, setUsername] = useState<string>("");

  const handlePostSnippet = () => {
    if (snippetInput.trim() !== "") {
      const detectedLanguage = detectLanguage(snippetInput);
      const newSnippet: CodeSnippet = {
        id: generateGUID(),
        code: snippetInput.trim(),
        language: detectedLanguage,
        likes: 0,
        liked: false,
        favorited: false,
        comments: { count: 0, list: [] },
        showCommentSection: false,
        timestamp: Date.now(),
      };
      setPostedSnippets([newSnippet, ...postedSnippets]);
      setSnippetInput("");
    }
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  const toggleNotifications = () => {
    setHasNotifications(!hasNotifications);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [width, setWidth] = React.useState(400);

  const handleResize = (
    _: any,
    { size }: { size: { width: number; height: number } }
  ) => {
    setWidth(size.width);
  };

  const setLoggedInUsername = (name: string) => {
    setUsername(name);
  };

  const initialSnippets: CodeSnippet[] = [
    // Initial snippets data
  ];

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setLoggedInUsername("User123");
      return <Link to="/myaccount">My Account</Link>;
    } else {
      return <Link to="/notsignedin">Not Signed In</Link>;
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Container>
        <Header>
          <Hamburger onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </Hamburger>
          <Logo>ShareSnips</Logo>
          <ToggleButton onClick={toggleTheme}>Toggle Theme</ToggleButton>
        </Header>
        <ToastContainer />
        <Sidebar isOpen={isSidebarOpen}>
          <SidebarContent>
            <BackIcon onClick={toggleSidebar}>
              <LogoInLeftBar src={logo} alt="logo" />
              <FontAwesomeIcon icon={faArrowLeft} />
            </BackIcon>
            <SidebarLink>
              <IconSize>
                <FontAwesomeIcon icon={faHouse} />
              </IconSize>
              <IconText>Home</IconText>
            </SidebarLink>
            <SidebarLink>
              <FontAwesomeIcon icon={faUsers} />
              <Link to="/friends">
                <IconText>Friends</IconText>
              </Link>
            </SidebarLink>
            <SidebarLink>
              <FontAwesomeIcon icon={faUsers} />
              <Link to="/todolist">
                <IconText>To Do List</IconText>
              </Link>
            </SidebarLink>
            <SidebarLink>
              <FontAwesomeIcon icon={faUsers} />
              <Link to="/calendar">
                <IconText>Calendar</IconText>
              </Link>
            </SidebarLink>
          </SidebarContent>
        </Sidebar>

        <SecondSidebar>
          <Resizable
            width={width}
            height={Infinity}
            minConstraints={[200, Infinity]}
            maxConstraints={[600, Infinity]}
            onResize={handleResize}
          >
            <SecondSidebarContent style={{ width: `${width}px` }}>
              <SecondSidebarLink>
                <FontAwesomeIcon icon={faUsers} />
                <IconText>Feed</IconText>
              </SecondSidebarLink>
              <ShareSnipsBox>
                <h3>ShareSnips</h3>
                <p>
                  Thank you for logging in as {username}. Have fun sharing
                  snips!
                </p>
              </ShareSnipsBox>
              {notifications.map((notification, index) => (
                <div key={index}>{notification}</div>
              ))}
            </SecondSidebarContent>
          </Resizable>
        </SecondSidebar>
        <SearchContainer>
          <SearchBar type="text" placeholder="Search something..."></SearchBar>
          <SearchButton>Search</SearchButton>
        </SearchContainer>

        <ShareBox>
          <Input
            placeholder="Share something..."
            value={snippetInput}
            onChange={(e) => setSnippetInput(e.target.value)}
          />
          {snippetInput && (
            <div style={{ margin: "10px 0", color: currentTheme.accent }}>
              Detected language: {detectLanguage(snippetInput)}
            </div>
          )}
          <PostButton onClick={handlePostSnippet}>Post</PostButton>
        </ShareBox>
        <h1>Code Snippets</h1>
        <CodeSnippetsList snippets={[...initialSnippets, ...postedSnippets]} />
      </Container>
      {backendData?.message && <p>Backend says: {backendData.message}</p>}
      <MobileNavbar />
    </ThemeProvider>
  );
}
