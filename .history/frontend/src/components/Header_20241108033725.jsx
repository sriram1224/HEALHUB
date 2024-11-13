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
      </div>
    </div>
  );
};

export default Header;
