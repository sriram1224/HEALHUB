import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendurl } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <img src={profileData.image} alt="" />
      </div>
    </div>
  );
};

export default DoctorProfile;
