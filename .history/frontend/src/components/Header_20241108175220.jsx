import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className=" flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-600 to-black rounded-lg  pb-0 p-10 text-white mt-3">
      {/* ---This is the left side container*/}

      <div className="flex-1 space-y-6">
        <p className="text-3xl font-bold">
          Book Appointment <br /> with Trusted Doctors
        </p>
        <div className="flex items-center space-x-4">
          <img
            src={assets.group_profiles}
            alt="Group Profiles"
            className="w-15 h-12 rounded-full"
          />
          <p className="text-s">
            Simply browse through our extensive list of trusted doctors,
            <br /> schedule your appointment hassle-free.
          </p>
        </div>
        <button className="bg-white text-blue-800 px-6 py-3 rounded-lg hover:bg-blue-100 hover:text-black transition duration-300">
          <a href="" className="flex items-center space-x-2">
            <span>Book Appointment</span>
            <img src={assets.arrow_icon} alt="Arrow Icon" className="w-4 h-4" />
          </a>
        </button>
      </div>

      {/* ---This is the right side container*/}

      <div className="flex-1 mt-6 md:mt-0">
        <img
          src={assets.header_img}
          alt="Header Image"
          className="w-full h-auto "
        />
      </div>
    </div>
  );
};

export default Header;
