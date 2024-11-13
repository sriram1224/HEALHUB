import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="p-6 bg-black rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-white">
        Top Doctors to Book
      </h1>
      <p className="text-center mb-6 text-gray-300">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
