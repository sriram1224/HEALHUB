import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { DoctorContextProvider } from "./context/DoctorContext.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
