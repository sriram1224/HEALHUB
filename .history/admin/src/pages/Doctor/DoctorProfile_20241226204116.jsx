import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendurl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  console.log(profileData);
  if (!profileData) {
    return <div>Loading...</div>;
  }
  const handleEdit = () => {
    setIsEdit(true);
  };
  console.log(isEdit);

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
        {typeof profileData.address === "string" ? (
          (() => {
            const address = JSON.parse(profileData.address);
            return (
              <>
                <p>{address.line1}</p>
                <p>{address.line2}</p>
              </>
            );
          })()
        ) : (
          <>
            <p>{profileData.address.line1}</p>
            <p>{profileData.address.line2}</p>
          </>
        )}
      </div>
      <div>
        <input type="checkbox" />
        <label htmlFor="">Available</label>
      </div>
      <div>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default DoctorProfile;
