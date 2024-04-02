import HomePage from "./pages/homepage";
import LandingPage from "./pages/landingpage";
import Friends from "./pages/friends";
import { Routes, Route } from "react-router-dom";
import NotSignedInPage from "./pages/notsignedin";
import MyAccount from "./pages/myaccount";
import ToDo from "./pages/todolist";
import { BreakpointProvider, Breakpoint } from "react-socks";

function App() {
  return (
    <>
      <BreakpointProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<Friends />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/todolist" element={<ToDo />} />
          <Route path="/notsignedin" element={<NotSignedInPage />} />
          <Route
            path="/MyAccount"
            element={<MyAccount username={""} email={""} />}
          />
        </Routes>
      </BreakpointProvider>
    </>
  );
}

export default App;
