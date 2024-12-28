import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ThemeContext } from "../../context/ThemeContext";

const DoctorProfile = () => {
  const { theme } = useContext(ThemeContext);
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

  if (!profileData) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div
        className={` w-full p-8 shadow-xl rounded-xl border-4 ${
          theme === "dark"
            ? "border-yellow-400 bg-gray-800"
            : "border-yellow-600 bg-gray-100"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side: Profile Image */}
          <div className="flex justify-center md:w-1/3 mb-8 md:mb-0">
            <img
              className="w-48 h-48 rounded-full object-cover border-4 border-yellow-500"
              src={profileData.image}
              alt="Doctor"
            />
          </div>

          {/* Right side: Profile Info */}
          <div className="md:w-2/3 text-center md:text-left">
            {/* Edit and Save Buttons */}
            <div className="flex justify-end mb-8">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-8 py-3 text-white rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 font-semibold hover:bg-gradient-to-l transition duration-300"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-8 py-3 text-white rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 font-semibold hover:bg-gradient-to-l transition duration-300"
                >
                  Edit
                </button>
              )}
            </div>

            {/* Doctor Info */}
            <p className="text-4xl font-semibold">{profileData.name}</p>
            <p className="text-xl text-gray-500">
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full">
              {profileData.experience}
              {profileData.experience === 1 ? s : ""} of experience
            </button>

            {/* Doctor's About */}
            <div className="mt-8">
              <p className="text-lg">{profileData.about}</p>
              <p className="mt-4 text-xl">
                Appointment Fees:{" "}
                <span className="font-semibold text-blue-400">
                  {currency}
                  {isEdit ? (
                    <input
                      type="number"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      value={profileData.fees}
                      className="ml-2 w-32 text-lg text-gray-700 bg-gray-300 border rounded-md p-2"
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>
            </div>

            {/* Address Section */}
            <div className="mt-8">
              <p className="text-xl font-semibold">Address:</p>
              <div>
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={profileData.address.line1}
                      className="w-full text-lg text-gray-700 bg-gray-300 border rounded-md p-3 mt-2"
                    />
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={profileData.address.line2}
                      className="w-full text-lg text-gray-700 bg-gray-300 border rounded-md p-3 mt-2"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-lg">{profileData.address.line1}</p>
                    <p className="text-lg">{profileData.address.line2}</p>
                  </>
                )}
              </div>
            </div>

            {/* Availability Section */}
            <div className="flex items-center justify-start mt-8">
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
              <label className="text-lg">Available for appointments</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
