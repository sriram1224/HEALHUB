import { useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  console.log(speciality);
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p>Browse through the doctors specialist.</p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
};

export default Doctors;
