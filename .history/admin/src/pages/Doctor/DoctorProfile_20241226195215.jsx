import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { profileData, setProfileData } = useContext(DoctorContext);
  console.log(profileData);
  return <div></div>;
};

export default DoctorProfile;
