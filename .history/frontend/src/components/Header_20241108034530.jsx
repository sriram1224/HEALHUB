import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="max-w-screen-xl">
      {/* ---This is the left side container*/}

      <div>
        <p>
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div>
          <img src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br /> schedule your appointment hassle-free.
          </p>
        </div>
        <a href="">
          Book Appointment <img src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* ---This is the right side container*/}
      <div>
        <img src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
