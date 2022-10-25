import Home from "@pages/Home/Home";
import Menu from "@pages/Menu/Menu";
import Search from "@pages/Search/Search";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  let routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );

  return (
    <>
      <Router>{routes}</Router>
    </>
  );
}

export default App;
