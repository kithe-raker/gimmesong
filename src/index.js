import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { switchTheme } from "@theme/switch.chakra";

import { install } from "ga-gtag";

import { BrowserRouter as Router } from "react-router-dom";

import "@styles/index.css";
import "@styles/custom.css";

console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("REACT_APP_ENV: ", process.env.REACT_APP_ENV);

// disable console log on production
if (
  process.env.NODE_ENV === "production" &&
  process.env.REACT_APP_ENV === "production"
)
  console.log = () => {};

const theme = extendTheme({
  components: { Switch: switchTheme },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Router>

  // </React.StrictMode>
);

// Initialize google analytics
install("G-VHWW02H931");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
