import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import Login from "./pages/Login";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="relative bg-[#EDE8F5]">
      <ToastContainer />

      {/* Bubbles in the background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* Bubble 1 */}
        <div className="absolute top-20 left-50 w-52 h-52 bg-gradient-to-r from-[#AAABDB] to-[#B5D7F0] rounded-full blur-[10px] opacity-100"></div>
        <div className="absolute top-1/4 left-40 w-52 h-52 bg-gradient-to-r from-[#AAABDB] to-[#B5D7F0] rounded-full blur-[10px] opacity-100"></div>
        {/* Bubble 2 */}
        <div className="absolute top-30 right-20 w-48 h-48 bg-gradient-to-r from-[#8697C4] to-[#182b38]  rounded-full blur-[10px] opacity-50"></div>
        {/* Bubble 3 */}
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-[#3D52A0] rounded-full blur-[10px] opacity-50"></div>
        {/* Bubble 4 */}
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#ADBBDA] rounded-full blur-[10px] opacity-50"></div>
        {/* Bubble 5 */}
        <div className="absolute top-2/3 left-1/3 w-36 h-36 bg-[#7091E6] rounded-full blur-[10px] opacity-50"></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-gradient-to-t from-[#AAABDB] to-[#123248] rounded-full blur-[6px] opacity-50"></div>
        {/* Bubble 6 */}
        <div className="absolute bottom-1/4 right-20 w-72 h-72 bg-gradient-to-t from-[#AAABDB] to-[#B5D7F0] rounded-full blur-[6px] opacity-50"></div>
      </div>

      {/* Main content with padding to prevent overlap */}
      <div className="relative z-10">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointment" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}
