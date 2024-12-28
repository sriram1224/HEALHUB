import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendurl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  // Update Profile Handler
  const updateProfile = async () => {
    try {
      const updateData = {
        fees: profileData.fees,
        address: JSON.stringify(profileData.address), // stringified address
        available: String(profileData.available), // send as string ("true" or "false")
      };
      const { data } = await axios.post(
        `${backendurl}/api/doctors/update-profile`,
        updateData,
        { headers: { dToken } }
      );
      console.log("Profile updated successfully:", data);
      toast.success("Profile updated successfully");
      setIsEdit(false);
    } catch (error) {
      console.error("Error in updateProfile:", error.message);
      toast.error("Failed to update profile");
    }
  };

  // Fetch Profile Data on Token Change
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  // Debugging State
  useEffect(() => {
    console.log("Profile Data Updated:", profileData);
  }, [profileData]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Profile Image */}
      <div>
        <img src={profileData.image} alt="Doctor" />
      </div>

      {/* Doctor Info */}
      <div>
        <p>{profileData.name}</p>
      </div>

      <div>
        <p>
          {profileData.degree} - {profileData.speciality}
        </p>
        <button>{profileData.experience}</button>
      </div>

      {/* Doctor's About */}
      <div>
        <p>{profileData.about}</p>
        <p>
          Appointment Fees:{" "}
          <span>
            {currency}
            {isEdit ? (
              <input
                type="number"
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                }
                value={profileData.fees}
              />
            ) : (
              profileData.fees
            )}
          </span>
        </p>
      </div>

      {/* Address Section */}
      <div>
        <p>Address:</p>
        <p>
          {isEdit ? (
            <input
              type="text"
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
              value={profileData.address.line1}
            />
          ) : (
            profileData.address.line1
          )}
        </p>
        <p>
          {isEdit ? (
            <input
              type="text"
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
              value={profileData.address.line2}
            />
          ) : (
            profileData.address.line2
          )}
        </p>
      </div>

      {/* Availability Checkbox */}
      <div>
        <input
          type="checkbox"
          checked={profileData.available === "true"} // compare with string "true"
          onChange={() => {
            if (isEdit) {
              setProfileData((prev) => ({
                ...prev,
                available: prev.available === "true" ? "false" : "true", // toggle between "true" and "false"
              }));
            }
          }}
        />
        <label>Available</label>
      </div>

      {/* Edit and Save Buttons */}
      <div>
        {isEdit ? (
          <button onClick={updateProfile}>Save</button>
        ) : (
          <button onClick={() => setIsEdit(true)}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
