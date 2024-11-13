import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const [filteredDoc, setFilteredDoc] = useState([]);
  const { speciality } = useParams();
  console.log(speciality);
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p>Browse through the doctors specialist.</p>
      <p>General physician</p>
      <p>Gynecologist</p>
      <p>Dermatologist</p>
      <p>Pediatricians</p>
      <div>
        {filteredDoc.length > 0
          ? filteredDoc.map((doc, index) => (
              <div key={index}>
                <p>{doc.name}</p>
                <p>{doc.speciality}</p>
                <p>{doc.experience}</p>
              </div>
            ))
          : doctors.map((doc, index) => (
              <div key={index}>
                <p>{doc.name}</p>
                <p>{doc.speciality}</p>
                <p>{doc.experience}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Doctors;
