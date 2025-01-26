import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);
  return (
    <div>
      <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
        <h1 className="text-3xl font-mediu">Top Doctors to Book</h1>
        <p className="sm:w-1/3 text-center text-sm">
          Simply browser through our extensive list of trusted doctors
        </p>
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {relDoc.slice(0, 5).map((item, index) => (
            <Link
              to={`/appointment/${item._id}`}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translate-all duration-500"
              key={index}
            >
              <img
                className="bg-blue-50 "
                src={item.image}
                alt="doctor image"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>{" "}
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          to="/doctors"
          className="bg-primary text-white font-medium px-8 py-3 hover:bg-hoverPrimary rounded-full mt-10 transition duration-300"
        >
          More
        </Link>
      </div>
    </div>
  );
};

export default RelatedDoctors;
