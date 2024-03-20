import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Mypage from "./pages/Mypage/Mypage";
import Radio from "./pages/Radio/Radio";
import Main from "./pages/Main/Main";
import SideNavBar from "./components/Common/SideNavBar";
import Header from "./components/Common/Header";
import Problem1 from "./pages/Zbti/Problem1";
import Problem5 from "./pages/Zbti/Problem5";
import Problem4 from "./pages/Zbti/Problem4";
import Problem3 from "./pages/Zbti/Problem3";
import Problem2 from "./pages/Zbti/Problem2";
import Problem6 from "./pages/Zbti/Problem6";
import Problem7 from "./pages/Zbti/Problem7";
import Problem8 from "./pages/Zbti/Problem8";
import ZbtiStart from "./pages/Zbti/ZbtiStart";
import { AnimatePresence } from "framer-motion";
import Loading from "./pages/Zbti/Loading";
import Predict from "./pages/Predict/Predict";
import PredictCreate from "./pages/Predict/PredictCreate";

function App() {
  const location = useLocation();

  const showHeaderandSide = () => {
    const { pathname } = location;
    return ![
      "/login",
      "/signup",
      "/problem1",
      "/problem2",
      "/problem3",
      "/problem4",
      "/problem5",
      "/problem6",
      "/problem7",
      "/problem8",
    ].includes(pathname);
  };

  return (
    <div>
      <AnimatePresence>
        {showHeaderandSide() && <Header />}
        {showHeaderandSide() && <SideNavBar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/main" element={<Main />} />
          <Route path="/my-page" element={<Mypage />} />

          <Route path="/zbti" element={<ZbtiStart />} />
          <Route path="/problem1" element={<Problem1 />} />
          <Route path="/problem2" element={<Problem2 />} />
          <Route path="/problem3" element={<Problem3 />} />
          <Route path="/problem4" element={<Problem4 />} />
          <Route path="/problem5" element={<Problem5 />} />
          <Route path="/problem6" element={<Problem6 />} />
          <Route path="/problem7" element={<Problem7 />} />
          <Route path="/problem8" element={<Problem8 />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/predict" element={<Predict />} />

          <Route path="/predict/create" element={<PredictCreate />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
