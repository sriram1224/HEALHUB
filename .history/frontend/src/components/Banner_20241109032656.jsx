import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-green-500 p-10 rounded-lg flex flex-col md:flex-row items-center text-white relative">
      {/* left */}
      <div className="flex-1 space-y-4">
        <div>
          <p className="text-3xl font-bold">Book Appointment</p>
          <p className="text-2xl">With 100+ Trusted Doctors</p>
        </div>
        <button className="bg-white text-blue-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
          Create an Account
        </button>
      </div>
      {/* right */}
      <div className="flex-1 mt-6 md:mt-0 relative">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-80 h-auto rounded-lg shadow-lg absolute -top-100"
        />
      </div>
    </div>
  );
};

export default Banner;
