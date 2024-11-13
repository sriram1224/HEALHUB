import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";

// src/App.jsx
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={< />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointment" element={<Doctors />} />
      </Routes>
    </div>
  );
}
