import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Bhargav Sri ram",
    image: assets.profile_pic, // Changed 'Image' to 'image'
    email: "kasukurthibhargav8@gmail.com",
    phoneno: "000000000",
    address: {
      line1: "",
      line2: "",
    },
    gender: "Male",
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
