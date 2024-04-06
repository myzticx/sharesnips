import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Homepage from "./pages/homepage";
import Friends from "./pages/friends";
import { ToDo } from "./pages/todolist";
import App from "./App";
import Calendar from "./pages/calendar";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
