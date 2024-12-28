import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  console.log(profileData);
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return <div></div>;
};

export default DoctorProfile;
