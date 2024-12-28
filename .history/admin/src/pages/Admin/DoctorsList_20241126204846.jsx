import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors = [], atoken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {doctors.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.speciality}</p>
            <p>{item.email}</p>
            <p>{item.degree}</p>
            <p>{item.experience}</p>
            <p>{item.fees}</p>
            <p>{item.about}</p>
            <p>
              {JSON.parse(item.address).line1}, {JSON.parse(item.address).line2}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
