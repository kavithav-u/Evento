import React, { useState, useEffect } from "react";
import {
  useCancelBookingsMutation,
  useFetchBookingsMutation,
} from "../../Slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Slices/authSlice";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Loader from "./Loader";

const BookingList = () => {
  const [bookingData, setBookingData] = useState([]);
  const [getBookingdata, { isLoading }] = useFetchBookingsMutation();
  const [cancelBookingApi] = useCancelBookingsMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const dispatch = useDispatch();
  const itemsPerPage = 5;
  useEffect(() => {
    fetchBookings();
  }, [currentPage]);

  const fetchBookings = async () => {
    try {
      const _id = userInfo._id;
      const res = await getBookingdata(_id).unwrap();

      const myBookings = res.bookings;
      if (res.notActive) {
        dispatch(logout());
        toast.warning("User is blocked. Please log in again.");
      }
      setBookingData(myBookings);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleBooking = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };
  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const cancelBooking = async (bookingId) => {
    try {
      const response = await cancelBookingApi(bookingId);
      setBookingData((prevBookingData) =>
        prevBookingData.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, status: "canceled" }
            : booking
        )
      );
      closeModal();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookingData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="mx-4 sm:-mx-8 px-4 sm:px-8 bg py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SL NO.
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  City
                </th>
                <th className="px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  View
                </th>

                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5">
                    <div className="flex justify-center items-center py-8">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems?.map((booking, index) => (
                  <React.Fragment key={booking._id}>
                    <tr>
                      <td className="px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border-b border-gray-200 bg-white text-sm text-black">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border-b border-gray-200 bg-white text-sm ml-36">
                        <div className="flex flex-col ">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={booking.hall?.hallImage[0]}
                            alt="Avatar Tailwind CSS Component"
                          />
                          <div>{booking.hall.events?.eventType}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border-b border-gray-200 bg-white text-sm">
                        {booking.totalAmount}
                      </td>
                      <td className="px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border-b border-gray-200 bg-white text-sm">
                        {booking.hall?.location}
                      </td>
                      <td className=" px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border-b border-gray-200 bg-white text-sm">
                        <button
                          className="btn"
                          onClick={() => handleBooking(booking)}
                        >
                          View
                        </button>{" "}
                      </td>

                      {/* Add more cells for additional details */}
                    </tr>
                    {/* Modal for editing */}
                    {isModalOpen && (
                      <div
                        id="crud-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
                      >
                        <div className="w-full max-w-lg mx-auto">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                          <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                              <div className="text-black mb-2">
                                Order ID{" "}
                                <span className="fw-bold text-body">
                                  {selectedBooking.orderId}
                                </span>
                              </div>
                              <div className="text-black mb-0">
                                Placed On{" "}
                                <span className="fw-bold text-body">
                                  {selectedBooking.createdAt
                                    ? new Date(
                                        selectedBooking.createdAt
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </span>
                              </div>
                              <div className="card card-stepper">
                                <div className="card-header p-4 text-center">
                                  <div className="mb-6">
                                    <img
                                      className="mx-auto w-1/2 h-auto rounded-lg shadow-xl dark:shadow-gray-800 p-1"
                                      src={selectedBooking.hall?.hallImage[0]}
                                      alt={`Hall Image`}
                                    />
                                  </div>
                                  <h5 className="bold">
                                    {selectedBooking.hall?.hallName}
                                  </h5>
                                </div>
                                <div className="card-body p-4 flex justify-between">
                                  <div>
                                    <p className="text-black">
                                      Location: {selectedBooking.hall?.location}
                                    </p>
                                    <p className="text-black">
                                      Event:{" "}
                                      {selectedBooking.hall?.events?.eventType}
                                    </p>
                                    <p className="text-black">
                                      Booked For: {booking.totalDays} Days
                                    </p>
                                    <p className="text-black">
                                      Dates:{" "}
                                      <span className="text-body">
                                        {new Date(
                                          selectedBooking.startDate
                                        ).toLocaleDateString()}{" "}
                                        -{" "}
                                        {new Date(
                                          selectedBooking.endDate
                                        ).toLocaleDateString()}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-black">
                                      Status: {selectedBooking.status}
                                    </p>
                                    <p className=" bold">
                                      Total Amount: Rs.{" "}
                                      {selectedBooking.totalAmount}
                                    </p>
                                    <p className="text-black">
                                      Payment: Online
                                    </p>
                                  </div>
                                </div>
                                <div className="card-footer p-4">
                                  <div className="d-flex justify-content-between">
                                    <h5 className="fw-normal mb-0">
                                      {selectedBooking.status !==
                                        "canceled" && (
                                        <button onClick={openConfirmationModal}>
                                          Cancel Booking
                                        </button>
                                      )}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for cancel confirmation */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white p-6 rounded-lg w-96">
            {/* Modal Body */}
            <div className="relative p-3 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Are you sure you want to cancel this booking?
              </p>
            </div>
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setIsConfirmationModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                setIsConfirmationModalOpen(false);
                cancelBooking(selectedBooking._id);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end pb-2">
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
        {[...Array(Math.ceil(bookingData.length / itemsPerPage)).keys()].map(
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
            currentPage === Math.ceil(bookingData.length / itemsPerPage)
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-gray-700 text-white"
          }`}
          disabled={
            currentPage === Math.ceil(bookingData.length / itemsPerPage)
          }
        >
          <BsChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default BookingList;
