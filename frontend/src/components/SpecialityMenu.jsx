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
      className=""
    >
      <h1 className="p-3 text-6xl bg-gradient-to-b from-[#552f9b] via-[#4d3cae]  to-[#08105d] bg-clip-text text-transparent text-center font-bold">Find by Speciality</h1>
      <p className="text-center mb-6 text-2xl font-bold bg-gradient-to-b from-[#2eb9ff] via-[#4828fd]  to-[#0aa7f5] bg-clip-text text-transparent">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {specialityData.slice(0, 6).map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={`/doctors/${item.speciality}`}
            key={index}
            className="flex flex-col items-center transition-transform duration-300 transform hover:-translate-y-2 w-24 sm:w-20 md:w-24"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="rounded-full border border-orange-400"
            />
            <p className="text-xl text-center font-bold bg-gradient-to-b from-[#4e1971] via-[#5808a8]  to-[#004567] bg-clip-text text-transparent">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default SpecialityMenu;
