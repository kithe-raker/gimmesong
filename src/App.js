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
import ProtectedRoute from "@components/ProtectedRoute";

// import useAuth from "@store/auth";
import { useLocalStorage } from "@hooks/useLocalStorage";

function App() {
  // const { user, setUser } = useAuth();
  const [user, setUser] = useLocalStorage("user", null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((data) => {
      // implement get user info here and set only required properties to user object
      const { uid } = data;

      setUser({ uid, username: "taritinth" });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  let routes = (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAllowed={!user} redirectPath="/signup">
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute isAllowed={!user?.username} redirectPath="/menu">
            <SignUp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu"
        element={
          <ProtectedRoute isAllowed={user?.username} redirectPath="/">
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route path="/search" element={<Search />} />
      <Route
        path="/mysongs"
        element={
          <ProtectedRoute isAllowed={user?.username} redirectPath="/">
            <MySongs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myaccount"
        element={
          <ProtectedRoute isAllowed={user?.username} redirectPath="/">
            <MyAccount />
          </ProtectedRoute>
        }
      />
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
