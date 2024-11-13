import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div>
      {/* ---This is the left side container*/}

      <div>
        <p>Book Appointment</p>
      </div>

      {/* ---This is the right side container*/}
      <div>
        <img src={assets.group_profiles} alt="" />
        <p>
          Simply browse through our extensive list of trusted doctors,
          <br /> schedule your appointment hassle-free.
        </p>
      </div>
      <a href="">
        Book Appointment <img src="" alt="" />
      </a>
    </div>
  );
};

export default Header;
