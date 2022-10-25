import Home from "@pages/Home";
import MySongs from "@pages/MySongs";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  let routes = (
    <Routes>
      <Route path="/" element={<Home />} />
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
