import { useState, useEffect } from "react";

import Home from "@pages/Home";
import SignUp from "@pages/SignUp";
import Menu from "@pages/Menu";
import Search from "@pages/Search";
import MySongs from "@pages/MySongs";
import MyAccount from "@pages/MyAccount";

import Header from "@components/Header";
import Loading from "@components/Loading";
import ProtectedRoute from "@components/ProtectedRoute";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import useSession from "@hooks/useSession";
import { auth } from "@lib/firebase";

function App() {
  const { user, setUser } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(async (data) => {
      if (data) {
        const token = await auth.currentUser.getIdToken(true);

        // implement get user info here and set only required properties to user object
        const { uid } = data;

        // implement /me here

        setUser({ uid, username: "taritinth", token });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

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
        {loading ? (
          <Loading fullScreen />
        ) : (
          <>
            <Header />
            {routes}
          </>
        )}
      </Router>
    </>
  );
}

export default App;
