import { createRoot } from "react-dom/client";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import App from "./App.jsx";
import { DoctorContextProvider } from "./context/DoctorContext.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";

const history = createBrowserHistory({
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

createRoot(document.getElementById("root")).render(
  <HistoryRouter history={history}>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </HistoryRouter>
);
