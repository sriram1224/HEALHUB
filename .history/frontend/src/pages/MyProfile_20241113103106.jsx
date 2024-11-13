import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Bhargav Sri ram",
    Image: assets.profile_pic,
    email: "
kasukurthibhargav8@gmail.com",
    phoneno: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    DOB: "2000-01-01",
  });

  return (
    <div>
      <img src={userData.image} alt="" />
      <p>{userData.name}</p>
    </div>
  );
};

export default MyProfile;