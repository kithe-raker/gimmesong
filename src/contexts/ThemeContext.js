import { createContext } from "react";

import logo from "@assets/img/gimmesong_logo.png";
import santaHatLogo from "@assets/img/gimmesong_logo_with_santa_hat.png";

export const ThemeContext = createContext();

/**
 * A provider component for ThemeContext, a context that provide styles data according to each theme.
 * @param theme the theme to be used. options includes: "default", "christmas"
 * @returns
 */
function ThemeProvider({ theme, children }) {
  const themes = {
    default: {
      logo: logo,
      style: {
        header: {
          logo: "mr-2 h-[26px] w-[26px] shrink-0",
          logo_text: "gimmesong-primary-font select-none text-2xl",
        },
        home: {
          logo: "mt-6 w-60",
        },
        menu: {
          logo: "mr-2 h-[46px] w-[46px] shrink-0",
          logo_text: "gimmesong-primary-font text-5xl",
        },
        sent: {
          logo: "h-[71px]",
        },
      },
    },

    christmas: {
      logo: santaHatLogo,
      style: {
        header: {
          logo: "mr-2 w-[26px] shrink-0",
          logo_text: "gimmesong-primary-font mt-2 select-none text-2xl",
        },
        home: {
          logo: "ml-5 mt-6 w-32",
        },
        menu: {
          logo: "mr-2 w-[46px] shrink-0",
          logo_text: "gimmesong-primary-font mt-4 text-5xl",
        },
        sent: {
          logo: "w-[71px]",
        },
      },
    },
  };

  return (
    <ThemeContext.Provider value={themes[theme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
