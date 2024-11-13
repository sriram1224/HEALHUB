import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

// src/App.jsx
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
