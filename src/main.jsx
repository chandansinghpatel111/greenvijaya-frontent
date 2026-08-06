// index.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import FloatingContact from "./components/FloatingContact";
import { AuthProvider } from "./context/AuthContext";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Separated AppWrapper with useLocation hook
import { useLocation } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

function AppWrapper() {
  const location = useLocation();
  const hideFloatingContact = location.pathname.startsWith("/admin");

  return (
    <>
     
      <App />
      <ScrollToTop />
      {!hideFloatingContact && <FloatingContact />}
    </>
  );
}
