import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [filteredDoc, setFilteredDoc] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { speciality } = useParams();

  // 🛠️ Apply Filter Based on Speciality
  const applyFilter = useCallback(() => {
    if (speciality) {
      setFilteredDoc(
        doctors.filter((doc) =>
          doc.speciality.toLowerCase() === speciality.toLowerCase()
        )
      );
    } else {
      setFilteredDoc(doctors);
    }
  }, [doctors, speciality]);

  // 🔄 Update Filtered Doctors on Dependency Change
  useEffect(() => {
    if (doctors.length > 0) {
      applyFilter();
    }
  }, [doctors, speciality, applyFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-white p-6"
    >
      <div className="flex flex-col md:flex-row gap-10">
        {/* 🧠 Left - Filters Section */}
        <motion.div
          className="rounded-lg md:w-1/4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="p-4 rounded-lg items-center border border-[#6c382c]">
            <h1 className="cursor-pointer w-full border bg-gradient-to-r from-[#6c382cb9] via-[#814e33] to-[#421984c7] text-white mb-3 p-3 text-xl text-center rounded-lg hidden md:block">
              Filter
            </h1>

            {/* 📱 Mobile Filter Toggle Button */}
            <button
              className="text-xl font-bold mb-4 w-2/8 md:hidden bg-gradient-to-r from-[#6c382cb9] via-[#814e33] to-[#421984c7] py-2 px-6 rounded-lg flex items-center justify-between transition-all duration-300 shadow-lg transform hover:scale-105"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
              {showFilters ? (
                <KeyboardArrowUpIcon className="text-white transition-all duration-300 ml-2" />
              ) : (
                <KeyboardArrowDownIcon className="text-white ml-2" />
              )}
            </button>
            {/* 📊 Filter List */}
            {showFilters && (
              <div className="block md:hidden">
                <ul className="space-y-2">
                  {[
                    "General physician",
                    "Gynecologist",
                    "Dermatologist",
                    "Pediatricians",
                    "Neurologist",
                    "Gastroenterologist",
                  ].map((item) => (
                    <li
                      key={item}
                      onClick={() =>
                        speciality === item
                          ? navigate("/doctors")
                          : navigate(`/doctors/${item}`)
                      }
                      className={`cursor-pointer p-3 rounded-lg font-bold text-center hover:bg-transparent hover:text-[#421984] transition duration-300 ${speciality === item
                        ? "bg-gradient-to-r from-[#6c382cb9] via-[#814e338b] to-[#421984c7]"
                        : "border border-[#6c382c] bg-[#421984]"
                        }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 🖥️ Desktop Filter List */}
            <div className="hidden md:block">
              <ul className="space-y-2">
                {[
                  "General physician",
                  "Gynecologist",
                  "Dermatologist",
                  "Pediatricians",
                  "Neurologist",
                  "Gastroenterologist",
                ].map((item) => (
                  <li
                    key={item}
                    onClick={() =>
                      speciality === item
                        ? navigate("/doctors")
                        : navigate(`/doctors/${item}`)
                    }
                    className={`cursor-pointer p-3 rounded-lg font-bold text-center hover:bg-transparent hover:text-[#421984] transition duration-300 ${speciality === item
                      ? "bg-gradient-to-r from-[#6c382cb9] via-[#814e338b] to-[#421984c7]"
                      : "border border-[#6c382c] bg-[#421984]"
                      }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 👩‍⚕️ Right - Doctors List Section */}
        <motion.div
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          key={filteredDoc.map((doc) => doc._id).join(",")} // Key triggers animation on filter change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <AnimatePresence>
            {filteredDoc.map((item, index) => (
              <motion.div
                key={item._id || index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className=" hover:border p-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 rounded-full mr-4 shadow-md bg-gradient-to-r from-[#6c382c] via-[#814e33] to-[#421984] object-cover"
                />
                <div className="text-center">
                  <p className="text-xl font-semibold text-[#421984]">
                    {item.name}
                  </p>
                  <p className="text-gray-700">{item.speciality}</p>
                  <p className={`text-${item.available ? "green" : "red"}-500`}>
                    {item.available ? "Available" : "Not Available"}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Doctors;
