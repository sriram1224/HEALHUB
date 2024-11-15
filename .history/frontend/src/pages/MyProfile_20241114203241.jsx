import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Bhargav Srivastava",
    image: assets.profile_pic,
    email: "kasukurthibhargav8@gmail.com",
    phone: "000000000",
    address: {
      line1: "123 Main St",
      line2: "Suite 101",
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
    <div className="p-6   min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center md:items-start justify-between mb-6 md:flex-row">
          <h1 className="text-4xl font-bold mb-4 md:mb-0 text-center md:text-left">
            My Profile
          </h1>
          {isEdit ? (
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
              onClick={handleSave}
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

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-gradient from-blue-800 to-black rounded-lg p-6 shadow-lg">
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <img
              src={userData.image}
              alt="Profile"
              className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover mx-auto shadow-lg border-4 border-gray-700"
            />
          </div>

          <div className="w-full space-y-6">
            <div>
              <label className="block text-gray-400 text-sm">Name</label>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.name}
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
              <p className="text-xl">{userData.email}</p>
            </div>

            <div>
              <label className="block text-gray-400 text-sm">Phone</label>
              {isEdit ? (
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-xl">{userData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 text-sm">Address</label>
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
                    placeholder="Address Line 1"
                    className="w-full p-2 mb-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
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
                    placeholder="Address Line 2"
                    className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
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

            <div>
              <label className="block text-gray-400 text-sm">Gender</label>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-xl">{userData.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 text-sm">
                Date of Birth
              </label>
              <p className="text-xl">{userData.DOB}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
