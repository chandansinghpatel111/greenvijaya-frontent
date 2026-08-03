// index.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import WhatsAppButton from "./Pages/whatsapp";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);

// Separated AppWrapper with useLocation hook
import { useLocation } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import { ThemeProvider } from "./context/ThemeContext";

function AppWrapper() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <App />
      <ScrollToTop />
      <WhatsAppButton />
    </ThemeProvider>
  );
}
