import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-blue-800 to-black mt-10 mb-10 px-6 md:px-20 rounded-lg flex flex-col md:flex-row items-center text-white relative">
      {/* left */}
      <div className="flex-1 space-y-4 text-center md:text-left">
        <div>
          <p className="text-3xl font-bold">Book Appointment</p>
          <p className="text-2xl">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-white text-blue-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          Create an Account
        </button>
      </div>
      {/* right */}
      <div className="flex-1 mt-6 md:mt-0 relative flex justify-center md:justify-end">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-60 h-auto md md:h-30 -mt-10"
        />
      </div>
    </div>
  );
};

export default Banner;
