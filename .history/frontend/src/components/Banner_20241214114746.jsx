import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect } from "react";

const Banner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-blue-800 to-black mt-10 mb-10 px-6 md:px-20 rounded-lg flex flex-col md:flex-row items-center text-white relative">
      {/* left */}
      <div className="flex-1 space-y-4 text-center md:text-left">
        <div>
          <p className="text-3xl font-bold">Book Appointment</p>
          <p className="text-2xl">With "100+" Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-white text-blue-800 px-6 py-3 rounded-lg mb-auto hover:bg-black hover:text-white  transition duration-300"
        >
          Create an Account
        </button>
      </div>
      {/* right */}
      <div className="flex-1 mt-6 md:mt-0 relative flex justify-center md:justify-end">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-40 h-auto md:w-60 md:h-auto    mt:10 md:-mt-10"
        />
      </div>
    </div>
  );
};

export default Banner;
