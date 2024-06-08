import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
  showCommentSection: boolean;
}

interface Props {
  snippets: CodeSnippet[];
}

const FavoritePage: React.FC<Props> = ({ snippets }) => {
  const FavoriteCodeSnippetCard = styled.div`
    background-color: ${(props) =>
      props.theme.cardBackground}; /* Set the background color for each post */
    color: ${(props) => props.theme.text};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid ${(props) => props.theme.borderColor};
  `;

  const FavoriteButton = styled.button<{ favorited: boolean }>`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) =>
      props.favorited ? props.theme.accent : props.theme.text};
  `;

  const getStarIcon = (favorited: boolean) => (favorited ? faStar : farStar);

  const handleFavorite = (id: number) => {
    // Handle favorite logic
  };

  return (
    <div>
      {snippets.map((snippet) => (
        <FavoriteCodeSnippetCard key={snippet.id}>
          <div>
            <pre>{snippet.code}</pre>
          </div>
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
        </FavoriteCodeSnippetCard>
      ))}
    </div>
  );
};

export default FavoritePage;
