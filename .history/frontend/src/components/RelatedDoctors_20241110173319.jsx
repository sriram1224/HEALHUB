import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [reldocs, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors && speciality) {
      const relatedDocs = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(relatedDocs);
    }
  }, [doctors, speciality, docId]);

  return (
    <div>
      {reldocs.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reldocs.map((doc) => (
              <div
                key={doc._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-24 h-24 rounded-full mb-4 mx-auto object-cover"
                />
                <div className="text-center">
                  <p className="text-xl font-semibold text-white">{doc.name}</p>
                  <p className="text-gray-400">{doc.speciality}</p>
                  <p className="text-green-500">Available</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No related doctors found.</p>
      )}
    </div>
  );
};

RelatedDoctors.propTypes = {
  speciality: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
};

export default RelatedDoctors;
