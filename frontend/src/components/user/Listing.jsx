import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchListingMutation } from "../../Slices/usersApiSlice.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { toast } from "react-toastify";
import Loader from "../../components/user/Loader";
import { FaLocationDot } from "react-icons/fa6";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Testimonials from "../../components/user/review.jsx";

const Listing = () => {
  const { eventId } = useParams();
  const [halls, setHalls] = useState([]);
  const [fetchHallsByEventId, { isLoading }] = useFetchListingMutation();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust the number of items per page as needed

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Include currentPage in the dependency array

  const fetchData = async () => {
    try {
      const response = await fetchHallsByEventId(eventId).unwrap();
      setHalls(response.halls);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // Calculate the index of the last and first item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = halls.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="my-3">
        <h2 className="text-2xl font-semibold text-slate-600 pl-12">
          Banquet Halls
        </h2>
      </div>
      {isLoading ? (
        <div className="w-full h-56">
          <Loader />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {currentItems.map((hall) => (
            <div
              key={hall._id}
              className="bg-gray-500 mb-2 rounded-2xl p-2 text-center w-64"
            >
              <Link to={`/details/${hall._id}`} className="no-underline">
                <Swiper slidesPerView={1} spaceBetween={10}>
                  {hall.hallImage &&
                    hall.hallImage.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          loading="lazy"
                          className="rounded-2xl object-cover w-60 h-60 mx-auto"
                          src={image}
                          alt={`Image ${index}`}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </Link>
              <h2 className="font-bold text-sm mt-2">{hall.hallName}</h2>

              <div className="flex items-center justify-center mt-2">
                <FaLocationDot className="text-slate-600" />
                <h3 className="font-bold text-sm ml-1">{hall.location}</h3>
              </div>
              <div className="mt-1">
                <span className="font-bold text-sm">${hall.pricePerDay}</span>{" "}
                per night
              </div>
            </div>
          ))}
        </section>
      )}
      <Testimonials />

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`mx-1 px-3 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-gray-700 text-white"
          }`}
          disabled={currentPage === 1}
        >
          <BsChevronLeft className="h-5 w-5" />
        </button>
        {[...Array(Math.ceil(halls.length / itemsPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`mx-1 px-3 py-2 rounded ${
                currentPage === number + 1
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {number + 1}
            </button>
          )
        )}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`mx-1 px-3 py-2 rounded ${
            currentPage === Math.ceil(halls.length / itemsPerPage)
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-gray-700 text-white"
          }`}
          disabled={currentPage === Math.ceil(halls.length / itemsPerPage)}
        >
          <BsChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Listing;
