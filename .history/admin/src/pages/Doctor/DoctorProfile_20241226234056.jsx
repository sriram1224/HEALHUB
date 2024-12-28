import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useState, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
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
  }, [dToken, getProfileData]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Doctor Profile
        </h1>

        {/* Fees Section */}
        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-700">Fees:</p>
          <span className="text-lg text-gray-700">
            {isEdit ? (
              <input
                type="text"
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                }
                value={profileData.fees}
                className="ml-2 w-24 text-lg text-gray-700 bg-gray-300 border rounded-md p-2"
              />
            ) : (
              profileData.fees
            )}
          </span>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-700">Address:</p>
          <p className="text-lg text-gray-700">
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
                className="w-full text-lg text-gray-700 bg-gray-300 border rounded-md p-2 mt-2"
              />
            ) : (
              profileData.address.line1
            )}
          </p>
          <p className="text-lg text-gray-700">
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
                className="w-full text-lg text-gray-700 bg-gray-300 border rounded-md p-2 mt-2"
              />
            ) : (
              profileData.address.line2
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
