import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Mypage from "./pages/Mypage/Mypage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-page" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
