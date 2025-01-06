import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
      className="flex flex-col  md:flex-row items-center border border-[#915631] bg-gradient-to-r from-transparent to-[#DAB49D] rounded-lg pb-0 p-10 mx-10 mt-10"
    >
      {/* Left Side */}
      <div className="flex-1 space-y-6">
        <p className="text-6xl bg-gradient-to-b from-[#333653] via-[#9b674b]  to-[#27293B] bg-clip-text text-transparent  font-bold">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex items-center space-x-4">
          <img
            src={assets.group_profiles}
            alt="Group Profiles"
            className="w-15 h-12 rounded-full"
          />
          <p className="text-sm">
            Simply browse through our extensive list of trusted doctors,
            <br /> schedule your appointment hassle-free.
          </p>
        </div>
        <button onClick={() => (navigate('/doctors'))} className="bg-white text-blue-800 px-6 py-3 rounded-lg hover:bg-blue-100 hover:text-black transition duration-300">
          <a href="#speciality" className="flex items-center space-x-2">
            <span>Book Appointment</span>
            <img
              src={assets.arrow_icon}
              alt="Arrow Icon"
              className="w-4 h-4"
            />
          </a>
        </button>
      </div>

      {/* Right Side */}
      <div className="flex-1 mt-6 md:mt-0">
        <img src={assets.header_img} alt="Header Image" className="w-11/12" />
      </div>
    </motion.div>
  );
};

export default Header;
