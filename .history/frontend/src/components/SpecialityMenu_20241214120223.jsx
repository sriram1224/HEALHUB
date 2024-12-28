import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="p-6 bg-black rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-white">
        Find by Speciality
      </h1>
      <p className="text-center mb-6 text-gray-300">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
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
              className="w-32 h-32 gap-2 rounded-full mb-2"
            />
            <p className="text-sm font-semibold text-blue-500 text-center">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
