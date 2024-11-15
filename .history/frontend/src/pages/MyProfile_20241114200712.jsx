import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Bhargav Sri ram",
    image: assets.profile_pic, // Changed 'Image' to 'image'
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

  return (
    <div className="text-white">
      <img src={userData.image} alt="" />
      {isEdit ? (
        <input
          type="text"
          value={userData.name}
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      ) : (
        <p>{userData.name}</p>
      )}
      <hr />
      <div>
        <p>contact Information</p>
        <div>
          <p>Email Id:</p>
          <p>{userData.name}</p>
          <p>Phone no:</p>
          {isEdit ? (
            <input
              type="number"
              value={userData.phone}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, Phone: e.target.value }));
              }}
            />
          ) : (
            <p>{userData.phone}</p>
          )}
          {isEdit ? (
            <p>
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, address{...prev.address} }));
                }}
              />
            </p>
          ) : (
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
