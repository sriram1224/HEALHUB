import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {

  const { profileData, setProfileData,getProfiledata } = useContext(DoctorContext);
  useEffect(() => {
    setProfileData();
  });

  return <div></div>;
};

export default DoctorProfile;
