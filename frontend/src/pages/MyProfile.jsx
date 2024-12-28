import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { Mail, Phone, MapPin, Calendar, Users, Upload, Save, Edit } from 'lucide-react';
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
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className=" max-w-screen-lg p-4 rounded-lg bg-[#ADBBDA] mx-auto">
        <div className="flex flex-col  text-[#421984c7] items-center md:items-start justify-between gap-10 mb-6 md:flex-row">
          <h1 className="text-4xl font-bold mb-4 md:mb-0 text-center md:text-left">
            My Profile
          </h1>
          {isEdit ? (
            <button
              className=" px-6 py-2 rounded-lg bg-gradient-to-r from-[#6c382c] via-[#814e33] to-[#421984] text-[#ffffff] justify-center transition duration-300 shadow-md"
              onClick={updateProfile}
            >
              <SaveIcon />
              Save
            </button>
          ) : (
            <button
              className=" px-6 py-2 rounded-lg bg-gradient-to-r from-[#6c382c] via-[#814e33] to-[#421984] text-[#ffffff] flex justify-center  transition duration-300 shadow-md"
              onClick={() => setIsEdit(true)}
            >
              <EditIcon />
              Edit
            </button>
          )}
        </div>

        <div className="flex flex-col  md:flex-row items-center justify-between  rounded-lg">
          <div className="flex-shrink-0  p-[50px] mb-6 md:mb-0">
            {isEdit ? (
              <label htmlFor="image">
                <div className="relative">
                  <img
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                    className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover mx-auto shadow-lg "
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

          <div className="w-[90%] mb-10 space-y-6">
            <div>
              <label className="block text-[#421984c7] text-xl font-bold">Name</label>
              {isEdit ? (
                <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center">
                  <Users className="text-[#421984c7]" size={32} />
                  <input
                    type="text"
                    value={userData?.name || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="text-2xl text-[#421984c7] w-full bg-transparent"
                  />
                </div>
              ) : (
                <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center "><Users className="text-[#421984c7]" size={32} /><p className="text-2xl text-[#421984c7] ">{userData.name}</p></div>
              )}
            </div>

            <div>
              <label className="block text-[#421984c7] text-xl font-bold">Email</label>
              <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center "><Mail className="text-[#421984c7]" size={32} /><p className="text-2xl text-[#421984c7] "></p> <p className="text-2xl text-[#421984c7]">{userData?.email || "N/A"}</p></div>
            </div>

            <div>
              <label className="block text-[#421984c7] text-xl font-bold">Phone</label>
              {isEdit ? (
                <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center">
                  <Phone className="text-[#421984c7]" size={32} />
                  <input
                    type="tel"
                    value={userData?.phone || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="bg-[#EDE8F5] w-[500px] p-3 rounded-lg text-[#421984c7] outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center "><Phone className="text-[#421984c7]" size={32} /><p className="text-xl">{userData?.phone || "N/A"}</p></div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="block  text-xl font-bold text-[#421984c7]">Address</label>
              {isEdit ? (
                <div className="flex flex-col gap-2">
                  <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center">
                    <MapPin className="text-[#421984c7]" size={32} />
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
                      className="bg-[#EDE8F5] w-[500px] mb-2 rounded-lg text-[#421984c7] outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center">
                    <MapPin className="text-[#421984c7]" size={32} />
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
                      className="bg-[#EDE8F5] w-[500px]  rounded-lg text-[#421984c7] outline-none "
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center">
                    <MapPin className="text-[#421984c7]" size={32} />
                    <p className="text-xl">
                      {userData?.address?.line1 || "N/A"}
                    </p></div>
                  <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center">
                    <MapPin className="text-[#421984c7]" size={32} />

                    <p>
                      {userData?.address?.line2 || "N/A"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[#421984c7] text-sm">Gender</label>
              {isEdit ? (
                <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center">
                  <Users className="text-[#421984c7]" size={32} />
                  <select
                    value={userData?.gender || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    className="bg-[#EDE8F5] w-[500px]  p-2 rounded-lg text-[#421984c7] outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              ) : (
                <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center">
                  <Users className="text-[#421984c7]" size={32} />
                  <p className="text-xl text-[#421984c7]">{userData.gender}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-400 text-sm">Date of Birth</label>
              {isEdit ? (
                <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center">
                  <Calendar className="text-[#421984c7]" size={32} />
                  <input
                    type="date"
                    value={userData.DOB}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, DOB: e.target.value }))
                    }
                    className="w-[500px] p-2 rounded-lg text-[#421984c7] bg-[#EDE8F5] outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div className="bg-[#EDE8F5] text-2xl text-[#421984c7] w-[500px] flex gap-2 p-2 rounded-lg items-center">
                  <Calendar className="text-[#421984c7]" size={32} />
                  <p className="text-xl">
                    {new Date(userData.dob).toLocaleDateString("en-US")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MyProfile;
