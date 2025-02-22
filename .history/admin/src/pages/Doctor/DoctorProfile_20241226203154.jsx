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
  console.log(profileData);
  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <img src={profileData.image} alt="" />
      </div>
      {/* Doctor Info -- name, degree,experiance*/}
      <div>
        <p>{profileData.name}</p>
      </div>

      <div>
        <p>
          {profileData.degree}-{profileData.speciality}
        </p>
        <button>{profileData.experience}</button>
      </div>
      {/* Doctors About */}
      <div>
        <p>{profileData.about}</p>
        <p>
          Appointment Fees: <span>{profileData.fees}</span>
        </p>
      </div>
      <div>
        <p>Address:</p>
        <p>{ profileData.<address></address>}</p>
      </div>
    </div>
  );
};

export default DoctorProfile;
