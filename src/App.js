import Splash from "@components/Splash";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  let routes = (
    <Routes>
      <Route path="/" element={<Splash />} />
    </Routes>
  );

  return (
    <>
      <Router>{routes}</Router>
    </>
  );
}

export default App;
