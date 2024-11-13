import { useParams } from "react-router-dom";

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
      <p></p>
    </div>
  );
};

export default Doctors;
