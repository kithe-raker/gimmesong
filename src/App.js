import { useState, useEffect } from "react";

import Home from "@features/Home";
import SignUp from "@features/SignUp";
import Menu from "@features/Menu";
import Search from "@features/Search";
import MySongs from "@features/MySongs";
import Tutorial from "@features/Tutorials";

import Feed from "@features/RequestSongs/Feed";
import NewRequest from "@features/RequestSongs/NewRequest";
import ViewRequest from "@features/RequestSongs/ViewRequest";
import SendSong from "@features/RequestSongs/SendSong";

import { Toaster } from "react-hot-toast";
import Header from "@components/Header";
import Loading from "@components/Loading";
import ProtectedRoute from "@components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

import useSession from "@hooks/useSession";
import { useLocation } from "react-router-dom";

import GimmesongAPI from "@lib/gimmesong_api";
import { auth } from "@lib/firebase";

function App() {
  const { user, setUser } = useSession();
  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();

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
      <Route path="/request" element={<Feed />} />
      <Route path="/playlist/:id" element={<ViewRequest />} />
      <Route
        path="/playlist/:id/add"
        element={
          <ProtectedRoute isAllowed={user?.username} redirectPath="/">
            <SendSong />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request/new"
        element={
          <ProtectedRoute isAllowed={user?.username} redirectPath="/">
            <NewRequest />
          </ProtectedRoute>
        }
      />

      <Route path="/tutorial" element={<Tutorial />} />

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

  console.log(pathname);

  return (
    <>
      <Toaster />
      {loading ? (
        <Loading fullScreen />
      ) : (
        <>
          {pathname !== "/tutorial" && <Header />}
          {routes}
        </>
      )}
    </>
  );
}

export default App;
