import Home from "@pages/Home";
import SignUp from "@pages/SignUp";
import Menu from "@pages/Menu";
import Search from "@pages/Search";
import MySongs from "@pages/MySongs";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  let routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/search" element={<Search />} />
      <Route path="/mysongs" element={<MySongs />} />
    </Routes>
  );

  return (
    <>
      <Router>{routes}</Router>
    </>
  );
}

export default App;
