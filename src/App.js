import { useState, useEffect } from "react";

import Home from "@pages/Home";
import SignUp from "@pages/SignUp";
import Menu from "@pages/Menu";
import Search from "@pages/Search";
import MySongs from "@pages/MySongs";

import { Toaster } from "react-hot-toast";
import Header from "@components/Header";
import Loading from "@components/Loading";
import ProtectedRoute from "@components/ProtectedRoute";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import useSession from "@hooks/useSession";

import GimmesongAPI from "@lib/gimmesong_api";
import { auth } from "@lib/firebase";

function App() {
  const { user, setUser } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (data) => {
      console.log(data);
      if (data) {
        setLoading(true);
        const token = await auth.currentUser.getIdToken(true);

        // implement get user info here and set only required properties to user object
        const { uid } = data;

        // implement /me here
        const username = await GimmesongAPI.getUserInfo(uid);

        setUser({ uid, username, token });
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
          <ProtectedRoute
            isAllowed={user && !user?.username}
            redirectPath="/menu"
          >
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
      <Route path="/@:username" element={<Search />} />
      <Route
        path="/mysongs"
        element={
          <ProtectedRoute isAllowed={user?.username} redirectPath="/">
            <MySongs />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/myaccount"
        element={
          <ProtectedRoute isAllowed={user?.username} redirectPath="/">
            <MyAccount />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="*"
        element={
          <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6 pt-[60px]">
            <p>There's nothing here!</p>
          </div>
        }
      />
    </Routes>
  );

  return (
    <>
      <Router>
        <Toaster />
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
