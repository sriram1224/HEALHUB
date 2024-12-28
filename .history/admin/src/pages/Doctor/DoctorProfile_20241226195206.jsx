import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { profileData, setProfileData } = useContext(DoctorContext);

  return <div></div>;
};

export default DoctorProfile;
