import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { DoctorContextProvider } from "./context/DoctorContext.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";
import { AppContextPovider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextPovider>
          <App />
        </AppContextPovider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
