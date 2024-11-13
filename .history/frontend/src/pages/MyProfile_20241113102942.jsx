import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    Image: {assets.profile_pic},
    email: "",
    phoneno: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    DOB: "2000-01-01",
  });

  return <div></div>;
};

export default MyProfile;
