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
        address: profileData.address,
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
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-700 shadow-lg rounded-lg">
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          src={profileData.image}
          alt="Doctor"
        />
      </div>

      {/* Doctor Info */}
      <div className="text-center mb-4">
        <p className="text-3xl font-semibold text-gray-800">
          {profileData.name}
        </p>
        <p className="text-xl text-gray-600">
          {profileData.degree} - {profileData.speciality}
        </p>
        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-full">
          {profileData.experience} years
        </button>
      </div>

      {/* Doctor's About */}
      <div className="mb-6">
        <p className="text-lg text-gray-700">{profileData.about}</p>
        <p className="mt-4 text-xl text-gray-800">
          Appointment Fees:{" "}
          <span className="font-semibold text-blue-600">
            {currency}
            {isEdit ? (
              <input
                type="number"
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                }
                value={profileData.fees}
                className="ml-2 w-24 text-lg text-gray-700 bg-gray-200 border rounded-md p-2"
              />
            ) : (
              profileData.fees
            )}
          </span>
        </p>
      </div>

      {/* Address Section */}
      <div className="mb-6">
        <p className="text-xl font-semibold text-gray-700">Address:</p>
        <p className="text-lg text-gray-600">
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
              className="w-full text-lg text-gray-700 bg-gray-200 border rounded-md p-2 mt-2"
            />
          ) : (
            profileData.address.line1
          )}
        </p>
        <p className="text-lg text-gray-600">
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
              className="w-full text-lg text-gray-700 bg-gray-200 border rounded-md p-2 mt-2"
            />
          ) : (
            profileData.address.line2
          )}
        </p>
      </div>

      {/* Availability Checkbox */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={profileData.available === "true"}
          onChange={() => {
            if (isEdit) {
              setProfileData((prev) => ({
                ...prev,
                available: prev.available === "true" ? "false" : "true",
              }));
            }
          }}
          className="mr-2 h-6 w-6 text-green-500"
        />
        <label className="text-lg text-gray-700">Available</label>
      </div>

      {/* Edit and Save Buttons */}
      <div className="text-center">
        {isEdit ? (
          <button
            onClick={updateProfile}
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition duration-300"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
