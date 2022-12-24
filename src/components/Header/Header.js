import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useSession from "@hooks/useSession";

import { useDisclosure } from "@chakra-ui/react";

import { signOut } from "@lib/firebase";
import OnMainPage from "./components/OnMainPage";
import OnOtherPage from "./components/OnOtherPage";

function Header() {
  const location = useLocation();

  let render;
  if (
    location.pathname.startsWith("/club") ||
    location.pathname.startsWith("/mysongs")
  ) {
    render = <OnMainPage />;
  } else {
    render = <OnOtherPage />;
  }

  return (
    <>
      {!location.pathname.startsWith("/playlist") &&
        !location.pathname.startsWith("/tutorial") && (
          <header className="gimmesong-bg fixed top-0 right-0 left-0 z-50 mx-auto flex w-full max-w-md items-center justify-between px-2.5 pt-1">
            {render}
          </header>
        )}
    </>
  );
}

export default Header;
