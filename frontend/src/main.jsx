import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 1000, // Animation duration (1s)
  once: true,     // Only animate once
});
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
