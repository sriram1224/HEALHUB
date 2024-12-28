import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

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
          <h2 className="text-2xl font-bold text-[#421984] mb-4">Related Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {reldocs.map((doc) => (
              <Link to={`/appointment/${doc._id}`} key={doc._id}>
                <div className=" border-[#6c382c] border px-3 py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6c382c] via-[#814e33] to-[#421984]  mx-auto object-cover"
                  />
                  <div className="text-center">
                    <p className="text-xl font-semibold text-[#421984]">
                      {doc.name}
                    </p>
                    <p className="text-gray-700">{doc.speciality}</p>
                    {doc.available ? <p
                      className='text-green-500'

                    >
                      Available
                    </p> : <p
                      className="text-red-500"
                    >

                      Not Available

                    </p>}
                  </div>
                </div>
              </Link>
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
