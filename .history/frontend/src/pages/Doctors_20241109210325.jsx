import { useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  console.log(speciality);
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p></p>
    </div>
  );
};

export default Doctors;
