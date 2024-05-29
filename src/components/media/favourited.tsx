// import React from "react";
// // import { CodeSnippet } from "./CodeSnippet"; // Import your CodeSnippet component

// interface FavouritesProps {
//   favouriteSnippets: CodeSnippet[];
//   handleUnfavouriteSnippet: (id: string) => void;
// }

// const Favourites: React.FC<FavouritesProps> = ({
//   favouriteSnippets,
//   handleUnfavouriteSnippet,
// }) => {
//   return (
//     <div>
//       <h1>Favourite Snippets</h1>
//       {favouriteSnippets.map((snippet) => (
//         <div key={snippet.id}>
//           <pre>{snippet.code}</pre>
//           <button onClick={() => handleUnfavouriteSnippet(snippet.id)}>
//             Remove from favourites
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Favourites;

import React from "react";

const favourited = () => {
  return <div>favourited</div>;
};

export default favourited;
