import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
      className="relative h-[50vh] md:h-[80vh] rounded-xl text-white overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-center mt-16 mb-16"
    >
      {/* Left: Background Image */}
      <div className="relative w-full md:w-1/2 h-[50%] md:h-full">
        <img
          src={assets.contact_image}
          alt="Appointment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Right: Content Section */}
      <div className="text-center md:text-left px-6 md:px-12 py-8 md:py-0 md:w-1/2 flex flex-col justify-center items-center md:items-start space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-[#6c382c] via-[#814e33] to-[#9481b3] bg-clip-text text-transparent leading-tight">
          Book Your Appointment Now
        </h2>
        <p className="text-sm md:text-lg text-black max-w-lg">
          Experience seamless healthcare services with easy appointment
          scheduling and dedicated care from our specialists.
        </p>
        {token ? (
          <button
            onClick={() => navigate("/doctors")}
            className="bg-[#421984] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#6c382c] transition duration-300 ease-in-out transform hover:scale-105"
          >
            Book Appointment
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-[#421984] px-6 py-3 rounded-lg shadow-md hover:bg-[#421984] hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
          >
            Create an Account
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Banner;
