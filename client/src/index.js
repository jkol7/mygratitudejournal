import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { AuthProvider } from "./context/AuthProvider";
import { InspirationProvider } from "./context/InspirationProvider";

//ReactDOM.render(<App/>, document.getElementById("root"))

//New render method

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <InspirationProvider>
      <App />
    </InspirationProvider>
  </AuthProvider>
);
