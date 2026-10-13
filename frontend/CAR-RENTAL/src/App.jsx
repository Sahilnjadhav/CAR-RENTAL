import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation/Rootnavigation";

function App() {
  useEffect(() => {
    // Remove old persistent login data.
    // New login sessions use sessionStorage instead.
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return (
  <BrowserRouter> 
    <Navigation /> 
  </BrowserRouter>
  );
}

export default App;
