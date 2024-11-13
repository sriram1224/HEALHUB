import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
const Navbar = () => {
  return (
    <div>
      <img src={assets.logo} alt="" />
      <ul>
        <NavLink>
          <li>HOME</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>HOME</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>HOME</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>HOME</li>
          <hr />
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
