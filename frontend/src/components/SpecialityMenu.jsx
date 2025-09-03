import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";
import { motion } from "framer-motion";

const SpecialityMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
      id="speciality"
      className="px-4 sm:px-6 md:px-8 py-8 md:py-12"
    >
      <h1 className="p-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-b from-[#552f9b] via-[#4d3cae] to-[#08105d] bg-clip-text text-transparent text-center font-bold mb-2">Find by Speciality</h1>
      <p className="text-center mb-6 sm:mb-8 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-b from-[#2eb9ff] via-[#4828fd] to-[#0aa7f5] bg-clip-text text-transparent max-w-3xl mx-auto">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 justify-items-center max-w-6xl mx-auto">
        {specialityData.slice(0, 6).map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={`/doctors/${item.speciality}`}
            key={index}
            className="flex flex-col items-center transition-transform duration-300 transform hover:-translate-y-2 w-full max-w-[150px] p-3 sm:p-4 hover:bg-white hover:shadow-md rounded-lg"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="rounded-full border-2 border-orange-400 w-16 h-16 sm:w-20 sm:h-20 object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
            />
            <p className="text-sm sm:text-base md:text-lg text-center font-bold bg-gradient-to-b from-[#4e1971] via-[#5808a8] to-[#004567] bg-clip-text text-transparent mt-2 sm:mt-3 w-full px-1">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default SpecialityMenu;
