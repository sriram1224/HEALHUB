import { useState } from "react";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    Image: "",
    email: "",
    phoneno: "",
    address: {
      line1: "",
      line2: "",
    },
  });

  return <div></div>;
};

export default MyProfile;
