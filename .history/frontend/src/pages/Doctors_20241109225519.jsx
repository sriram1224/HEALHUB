import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [filteredDoc, setFilteredDoc] = useState([]);
  const { speciality } = useParams();

  const applyFilter = useCallback(() => {
    if (speciality) {
      setFilteredDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilteredDoc(doctors);
    }
  }, [doctors, speciality]);

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, applyFilter]);

  return (
    <div className="text-white p-6 bg-black">
      <div className=" flex flex-col md:flex-row gap-10">
        {/* Left - filters */}
        <div className="bg-gray-800 p-6 rounded-lg h-10 md:w-1/4">
          <h2 className="text-2xl font-bold mb-4">Filter by Speciality</h2>
          <ul className="space-y-2">
            <li
              onClick={() =>
                speciality === "General physician"
                  ? navigate("/doctors")
                  : navigate("/doctors/General physician")
              }
              className="cursor-pointer bg-gray-700 p-3 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              General physician
            </li>
            <li
              onClick={() =>
                speciality === "Gynecologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gynecologist")
              }
              className="cursor-pointer bg-gray-700 p-3 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Gynecologist
            </li>
            <li
              onClick={() =>
                speciality === "Dermatologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Dermatologist")
              }
              className="cursor-pointer bg-gray-700 p-3 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Dermatologist
            </li>
            <li
              onClick={() =>
                speciality === "Pediatricians"
                  ? navigate("/doctors")
                  : navigate("/doctors/Pediatricians")
              }
              className="cursor-pointer bg-gray-700 p-3 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Pediatricians
            </li>
            <li
              onClick={() =>
                speciality === "Neurologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Neurologist")
              }
              className="cursor-pointer bg-gray-700 p-3 rounded-lg  hover:bg-blue-500 transition duration-300"
            >
              Neurologist
            </li>
            <li
              onClick={() =>
                speciality === "Gastroenterologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gastroenterologist")
              }
              className="cursor-pointer bg-gray-700 p-3 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Gastroenterologist
            </li>
          </ul>
        </div>
        {/* Right - doctors list */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="bg-gray-800 hover:bg-black hover:border p-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer"
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
    </div>
  );
};

export default Doctors;
