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
      className="p-6 rounded-lg mt-20 text-white"
    >
      <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#6c382c] via-[#814e33] to-[#421984] mb-4">
        Top Doctors to Book
      </h1>
      <p className="text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6c382c] via-[#814e33] to-[#421984] mb-6">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {doctors.slice(0, 6).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="p-6 rounded-lg shadow-md border border-[#6c382c] hover:shadow-lg hover:border transition-transform duration-300 transform hover:-translate-y-2"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 rounded-full bg-gradient-to-r from-[#6c382c] via-[#814e33] to-[#421984] mb-4 mx-auto object-cover"
            />
            <div className="text-center">
              <p className="text-xl text-[#421984] font-semibold">{item.name}</p>
              <p className="text-gray-400">{item.speciality}</p>
              <p className={`text-${item.available ? "green" : "red"}-500`}>
                {item.available ? "Available" : "Not Available"}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Centered MORE Button */}
      <div className="flex justify-center mt-8">
        <button onClick={() => navigate('/doctors')} className="px-12 py-4 font-bold border rounded text-[#421984] border-[#6c382c] hover:bg-[#421984] hover:text-white transition-colors duration-300">
          MORE
        </button>
      </div>
    </motion.div>
  );
};

export default TopDoctors;
