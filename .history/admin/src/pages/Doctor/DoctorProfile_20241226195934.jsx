import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  useEffect(() => {
    getProfileData();
  });

  return <div></div>;
};

export default DoctorProfile;
