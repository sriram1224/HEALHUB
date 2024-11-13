import { doctors } from "../assets/assets";

const TopDoctors = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">
        Top Doctors to Book
      </h1>
      <p className="text-center mb-6">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-full mb-4 mx-auto"
            />
            <div className="text-center">
              <p className="text-xl font-semibold">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>
              <p className="text-gray-600">{item.degree}</p>
              <p className="text-gray-600">
                {item.experience} years of experience
              </p>
              <p className="text-gray-600">{item.fees} USD</p>
              <p className="text-gray-600">
                {item.address.line1}, {item.address.line2}
              </p>
              <p className="text-green-500">Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;
