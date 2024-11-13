import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
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
    </div>
  );
};

export default Doctors;
