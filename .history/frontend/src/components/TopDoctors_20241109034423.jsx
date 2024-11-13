import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="p-6 bg-black rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-500">
        Top Doctors to Book
      </h1>
      <p className="text-center mb-6 text-gray-300">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="flex justify-center gap-6 overflow-x-auto">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-64"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-full mb-4 mx-auto"
            />
            <div className="text-center">
              <p className="text-xl font-semibold text-blue-500">{item.name}</p>
              <p className="text-gray-400">{item.speciality}</p>
              <p className="text-green-500">Available</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo(0, 0);
          }}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          More
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
