import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/User/Login";
import Radio from "./pages/Radio/Radio";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/radio" element={<Radio />} />
      </Routes>
    </div>
  );
}

export default App;
