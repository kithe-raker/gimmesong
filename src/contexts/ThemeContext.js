import { createContext } from "react";

import logo from "@assets/img/gimmesong_logo.png";
import santaHatLogo from "@assets/img/gimmesong_logo_with_santa_hat.png";

export const ThemeContext = createContext();

/**
 * A provider component for ThemeContext, a context that provide styles data according to each theme. Note that images for each theme may not be of equal size, and further component layout adjustments may be needed.
 * @param theme the theme to be used. options includes: "default", "christmas"
 * @returns
 */
function ThemeProvider({ theme, children }) {
  const themes = {
    default: {
      logo: logo,
    },
    christmas: {
      logo: santaHatLogo,
    },
  };

  return (
    <ThemeContext.Provider value={themes[theme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
