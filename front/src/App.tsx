import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Radio from "./pages/Radio/Radio";
import Main from "./pages/Main/Main";
import SideNavBar from "./components/Common/SideNavBar";

function App() {
  return (
    <div>
      <SideNavBar />
      <Routes>
        <Route path="/" element={<SideNavBar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/radio" element={<Radio />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
