import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
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
        {filteredDoc.map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-black hover:border transition-transform duration-300 transform hover:-translate-y-2"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 rounded-full mb-4 mx-auto object-cover"
            />
            <div className="text-center">
              <p className="text-xl font-semibold text-white">{item.name}</p>
              <p className="text-gray-400">{item.speciality}</p>
              <p className="text-green-500">Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
