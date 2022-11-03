import { useState, useEffect } from "react";
import firebase from "@lib/firebase";

import Home from "@pages/Home";
import SignUp from "@pages/SignUp";
import Menu from "@pages/Menu";
import Search from "@pages/Search";
import MySongs from "@pages/MySongs";
import MyAccount from "@pages/MyAccount";

import Header from "@components/Header";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  let routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/search" element={<Search />} />
      <Route path="/mysongs" element={<MySongs />} />
      <Route path="/myaccount" element={<MyAccount />} />
    </Routes>
  );

  return (
    <>
      <Router>
        <Header />
        {routes}
      </Router>
    </>
  );
}

export default App;
