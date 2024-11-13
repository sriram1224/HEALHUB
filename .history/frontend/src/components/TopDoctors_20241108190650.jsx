import { doctors } from "../assets/assets"; // Ensure this import is correct

const TopDoctors = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">Top Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-24 h-24 rounded-full mb-4 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center">{doctor.name}</h2>
            <p className="text-center text-gray-600">{doctor.speciality}</p>
            <p className="text-center text-gray-600">{doctor.degree}</p>
            <p className="text-center text-gray-600">
              {doctor.experience} years of experience
            </p>
            <p className="text-center text-gray-600">{doctor.fees} USD</p>
            <p className="text-center text-gray-600">{doctor.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;
