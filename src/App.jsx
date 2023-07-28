import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

function App() {
  const isLogged = useSelector((state) => state.logged);
console.log(isLogged);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          {isLogged ? (
            <Route path="/profile" element={<Profile />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
