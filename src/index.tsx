import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Homepage from "./pages/homepage";
import Friends from "./pages/friends";
import { ToDo } from "./pages/todolist";
import LoginForm from "./pages/signup";
import App from "./App";

import Calendar from "./pages/calendar";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function Root() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Define isLoggedIn state

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/signup",
      element: <LoginForm setIsLoggedIn={setIsLoggedIn} />, // Pass setIsLoggedIn prop
    },
    {
      path: "/friends",
      element: <Friends />,
    },
    {
      path: "/homepage",
      element: <Homepage />,
    },
    {
      path: "/todolist",
      element: <ToDo />,
    },
    {
      path: "/calendar",
      element: <Calendar />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
