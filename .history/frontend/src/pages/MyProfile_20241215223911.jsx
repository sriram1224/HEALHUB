import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendurl, token, loadUserData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Load user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${backendurl}/api/user/get-profile`,
          {
            userId: userData._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.userData);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUserData();
  }, [backendurl, token, userData._id, setUserData]);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userData._id);
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.DOB);
      formData.append("gender", userData.gender);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `${backendurl}/api/user/update-profile`,
        formData,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully");
        await loadUserData();
        setIsEdit(false);
        setImage(false);
        // Reload user data
      } else {
        console.error("Error updating profile:", response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen text-white">
      <div className="max-w-4xl border p-4 rounded-lg mx-auto">
        <div className="flex flex-col items-center md:items-start justify-between mb-6 md:flex-row">
          <h1 className="text-4xl font-bold mb-4 md:mb-0 text-center md:text-left">
            My Profile
          </h1>
          {isEdit ? (
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
              onClick={updateProfile}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 rounded-lg p-6 shadow-lg">
          <div className="flex-shrink-0 mb-6 md:mb-0">
            {isEdit ? (
              <label htmlFor="image">
                <div className="relative">
                  <img
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                    className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover mx-auto shadow-lg border-4 border-gray-700"
                  />
                  {!image && !userData?.image && (
                    <img
                      src={assets.upload_icon}
                      alt="Upload Icon"
                      className="absolute inset-0 w-10 h-10 m-auto"
                    />
                  )}
                </div>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </label>
            ) : (
              <img
                src={userData?.image || assets.defaultProfileImage}
                alt="Profile"
                className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover mx-auto shadow-lg border-4 border-gray-700"
              />
            )}
          </div>

          <div className="w-full space-y-6">
            <div>
              <label className="block text-gray-400 text-sm">Name</label>
              {isEdit ? (
                <input
                  type="text"
                  value={userData?.name || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-2xl font-medium">{userData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 text-sm">Email</label>
              <p className="text-xl">{userData?.email || "N/A"}</p>
            </div>

            <div>
              <label className="block text-gray-400 text-sm">Phone</label>
              {isEdit ? (
                <input
                  type="tel"
                  value={userData?.phone || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-xl">{userData?.phone || "N/A"}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 text-sm">Address</label>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={userData?.address?.line1 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    placeholder="Address Line 1"
                    className="w-full p-2 mb-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={userData?.address?.line2 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    placeholder="Address Line 2"
                    className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              ) : (
                <p className="text-xl">
                  {userData?.address?.line1 || "N/A"}
                  <br />
                  {userData?.address?.line2 || "N/A"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 text-sm">Gender</label>
              {isEdit ? (
                <select
                  value={userData?.gender || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-xl">{userData?.gender || "N/A"}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 text-sm">
                Date of Birth
              </label>
              {isEdit ? (
                <input
                  type="date"
                  value={userData?.DOB || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, DOB: e.target.value }))
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-xl">{userData?.DOB || "N/A"}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
