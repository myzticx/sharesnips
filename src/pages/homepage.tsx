import React, { useState } from "react";
import { Resizable } from "react-resizable";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";
import { v4 as uuidv4 } from "uuid";
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
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import MobileNavbar from "../components/MobileNavbar";
import { toast, Toaster } from "react-hot-toast";

// Interface for code snippet
interface CodeSnippet {
  id: number;
  code: string;
  language: string;
  likes: number;
  liked: boolean;
  favorited: boolean;
  comments: {
    count: number;
    list: string[];
  };
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

const CodeSnippetCard = styled.div`
  background-color: ${(props) =>
    props.theme.cardBackground}; /* Set the background color for each post */
  color: ${(props) => props.theme.text};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Hamburger = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => props.theme.accent};

  @media (max-width: 768px) {
    display: none;
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
    display: none;
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

const getHeartIcon = (liked: boolean) => (liked ? faHeart : farHeart);
const getStarIcon = (favorited: boolean) => (favorited ? faStar : farStar);

const CodeSnippetsList: React.FC<{ snippets: CodeSnippet[] }> = ({
  snippets,
}) => {
  const [snippetList, setSnippetList] = useState<CodeSnippet[]>(snippets);
  const [commentInput, setCommentInput] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    setSnippetList(snippets);
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [snippets]);

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

  const handleLike = (id: number) => {
    const updatedSnippets = snippetList.map((snippet) => {
      if (snippet.id === id) {
        const newNotification = `Your post has received a like!`;
        setNotifications([newNotification, ...notifications]);

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

  const handleComment = (id: number) => {
    const updatedSnippets = snippetList.map((snippet) => {
      if (snippet.id === id) {
        const newComment = ` ${commentInput}`; // Replace with your actual comment logic
        const updatedCommentsList = [...snippet.comments.list, newComment];

        return {
          ...snippet,
          comments: {
            ...snippet.comments,
            count: snippet.comments.count + 1,
            list: updatedCommentsList,
          },
        };
      }
      return snippet;
    });

    setSnippetList(updatedSnippets);
    setCommentInput(""); // Clear the comment input after submitting
  };

  const handleFavorite = (id: number) => {
    const updatedSnippets = snippetList.map((snippet) => {
      if (snippet.id === id) {
        return { ...snippet, favorited: !snippet.favorited };
      }
      return snippet;
    });

    setSnippetList(updatedSnippets);
  };

  return (
    <div>
      {snippetList.map((snippet) => (
        <CodeSnippetCard key={snippet.id}>
          <div>
            <PreCode>{snippet.code}</PreCode>
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
            commented={snippet.comments.count > 0}
            onClick={() => handleComment(snippet.id)}
          >
            <FontAwesomeIcon icon={faComment} />
            {snippet.comments.count > 0
              ? `${snippet.comments.count} Comments`
              : "Comment"}
          </CommentButton>
          {snippet.comments.count > 0 && (
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
              <SendButton onClick={() => handleComment(snippet.id)}>
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

const ShareSnipsBox = styled.div`
  background-color: #333; /* Dark grey background color */
  color: white; /* Text color */
  border-radius: 10px; /* Curved edges */
  padding: 20px; /* Padding inside the box */
  margin-bottom: 20px; /* Margin to separate from other elements */
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

const InstagramCodeClone: React.FC = () => {
  const [snippetInput, setSnippetInput] = useState("");
  const [postedSnippets, setPostedSnippets] = useState<CodeSnippet[]>([]);
  const [currentTheme, setCurrentTheme] = useState(darkTheme); // Set dark theme as the initial theme
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  const checkCodeCharacteristics = (snippet: string) => {
    // Simple check for code characteristics
    const codeRegex = /[{}()<>;:,=]/;
    return codeRegex.test(snippet);
  };

  const handlePostSnippet = () => {
    if (snippetInput.trim() !== "") {
      // Check if the snippet contains code characteristics
      if (checkCodeCharacteristics(snippetInput)) {
        const newSnippet: CodeSnippet = {
          id: uuidv4(),
          code: snippetInput.trim(),
          language: "Any",
          likes: 0,
          liked: false,
          favorited: false,
          comments: { count: 0, list: [] }, // Initialize comments.list as an empty array
        };
        setPostedSnippets([newSnippet, ...postedSnippets]);
        setSnippetInput("");
        toast.success("Snippet posted successfully!");
      } else {
        // Display error toast if snippet doesn't contain code characteristics

        toast.error("Sorry, but that isn't a code snippet.");
      }
    }
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  const [username, setUsername] = useState("");

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

  const initialSnippets: CodeSnippet[] = [
    // Initial snippets data
  ];

  const handleProfileClick = () => {
    if (isLoggedIn) {
      // Redirect to myaccount.tsx if logged in
      return <Link to="/myaccount">My Account</Link>;
    } else {
      // Redirect to notsignedin.tsx if not logged in
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
            <SidebarLink>
              <FontAwesomeIcon icon={faStar} />
              <Link to="/calendar">
                <IconText>Favourites</IconText>
              </Link>
            </SidebarLink>
          </SidebarContent>
        </Sidebar>

        <SecondSidebar>
          <Resizable
            width={width}
            height={Infinity}
            minConstraints={[200, Infinity]} // Minimum width
            maxConstraints={[600, Infinity]} // Maximum width
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
              {/* Display notifications within the second sidebar */}
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
          <PostButton onClick={handlePostSnippet}>Post</PostButton>
        </ShareBox>

        <h1>Code Snippets</h1>
        <CodeSnippetsList snippets={[...initialSnippets, ...postedSnippets]} />
      </Container>
      <MobileNavbar />
    </ThemeProvider>
  );
};

export default InstagramCodeClone;
