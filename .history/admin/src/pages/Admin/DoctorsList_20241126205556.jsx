import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctor, atoken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {doctor.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p>{item.speciality}</p>
              <p>
                {JSON.parse(item.address).line1},{" "}
                {JSON.parse(item.address).line2}
              </p>
              <input type="checkbox" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
