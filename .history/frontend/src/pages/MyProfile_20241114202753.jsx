import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Bhargav Sri ram",
    image: assets.profile_pic,
    email: "kasukurthibhargav8@gmail.com",
    phone: "000000000",
    address: {
      line1: "",
      line2: "",
    },
    gender: "Male",
    DOB: "2000-01-01",
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    setIsEdit(false);
    // Add logic to save changes if needed
  };

  return (
    <div className="text-white p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {isEdit ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/3">
          <img
            src={userData.image}
            alt=""
            className="rounded-full w-48 h-48 object-cover mx-auto"
          />
        </div>
        <div className="w-full md:w-2/3">
          <div className="mb-4">
            <label className="block text-gray-400">Name</label>
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full p-2 rounded-lg bg-gray-800 text-white"
              />
            ) : (
              <p className="text-xl">{userData.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <p className="text-xl">{userData.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Phone</label>
            {isEdit ? (
              <input
                type="number"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full p-2 rounded-lg bg-gray-800 text-white"
              />
            ) : (
              <p className="text-xl">{userData.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Address</label>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="w-full p-2 rounded-lg bg-gray-800 text-white mb-2"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="w-full p-2 rounded-lg bg-gray-800 text-white"
                />
              </>
            ) : (
              <p className="text-xl">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Gender</label>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="w-full p-2 rounded-lg bg-gray-800 text-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-xl">{userData.gender}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Date of Birth</label>
            <p className="text-xl">{userData.DOB}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
