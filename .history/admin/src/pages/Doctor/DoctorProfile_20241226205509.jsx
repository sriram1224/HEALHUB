import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { use } from "react";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendurl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const updateProfile = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctors/update-profile`,
        { profileData },
        { headers: { dToken } }
      );
    } catch (error) {
      console.error("Error in updateProfile:", error.message);
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) {
    return <div>Loading...</div>;
  }
  const handleEdit = () => {
    setIsEdit(true);
  };

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
          Appointment Fees:{" "}
          <span>
            {currency}
            {isEdit ? <input type="number" /> : profileData.fees}
          </span>
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
        <input checked={profileData.available} type="checkbox" />
        <label htmlFor="">Available</label>
      </div>
      <div>
        {isEdit ? (
          <button onClick={() => setIsEdit(false)}>Save</button>
        ) : (
          <button onClick={() => setIsEdit(true)}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
