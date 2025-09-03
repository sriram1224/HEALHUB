import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
      className="p-6 sm:p-8 md:p-10 rounded-lg mt-10 sm:mt-16 md:mt-20 text-white w-full max-w-6xl mx-auto"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#6c382c] via-[#814e33] to-[#421984] mb-4">
        Top Doctors to Book
      </h1>
      <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6c382c] via-[#814e33] to-[#421984] mb-8 sm:mb-10">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {doctors.slice(0, 6).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="p-4 sm:p-6 rounded-lg shadow-md border border-[#6c382c] hover:shadow-lg hover:border transition-transform duration-300 transform hover:-translate-y-2 w-full"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-[#6c382c] via-[#814e33] to-[#421984] mb-4 mx-auto object-cover"
            />
            <div className="text-center">
              <p className="text-lg sm:text-xl text-[#421984] font-semibold mb-1">{item.name}</p>
              <p className="text-gray-600 text-sm sm:text-base mb-2">{item.speciality}</p>
              <p className={`text-${item.available ? "green" : "red"}-500 font-medium`}>
                {item.available ? "Available" : "Not Available"}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Centered MORE Button */}
      <div className="flex justify-center mt-10 sm:mt-12">
        <button 
          onClick={() => navigate('/doctors')} 
          className="px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold border-2 rounded-lg text-[#421984] border-[#6c382c] hover:bg-[#421984] hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          VIEW ALL DOCTORS
        </button>
      </div>
    </motion.div>
  );
};

export default TopDoctors;
