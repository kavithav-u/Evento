import React, { useState, useEffect} from 'react'
import { useCancelBookingsMutation, useFetchBookingsMutation } from '../../Slices/usersApiSlice';
import { useDispatch, useSelector  } from "react-redux";
import { logout } from '../../Slices/authSlice';
import {toast} from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";



const BookingList = () => {
  const [bookingData, setBookingData] = useState([]);
  const [getBookingdata] = useFetchBookingsMutation();
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
      console.log(res,"Dfd")
      const myBookings = res.bookings;
      if(res.notActive) {
        dispatch(logout());
        toast.warning('User is blocked. Please log in again.');
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
  console.log(selectedBooking,"selectedBooking")

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };
  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const cancelBooking = async(bookingId) => {
    try{
      const response = await cancelBookingApi(bookingId);
      console.log(response,"responce");
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
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 bg py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SL NO.
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  City
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  View
                </th>

                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((booking, index) => (
                <React.Fragment key={booking._id}>
                  <tr>
                    <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm text-black">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm ml-36">
    <div className="flex flex-col ">
      <img
        className="w-10 h-10 rounded-full"
        src={booking.hall?.hallImage[0]}
        alt="Avatar Tailwind CSS Component"
      />
      <div >{booking.hall.events?.eventType}</div>
    </div>
  </td>
                    <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                      {booking.totalAmount}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                      {booking.hall?.location}
                    </td>
                    <td className=" px-4 py-3 border-b border-gray-200 bg-white text-sm">
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
                      {/* Modal content */}
                      <div className="relative">
                        {/* Modal header */}

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

                        {/* Modal body */}

                        <div className="row d-flex justify-content-center align-items-center h-100">
                          <div className="card card-stepper">
                            <div className="card-header p-4">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <p className="text-muted mb-2">
                                    Order ID{" "}
                                    <span className="fw-bold text-body">
                                      {selectedBooking.orderId}
                                    </span>
                                  </p>
                                  <p className="text-muted mb-0">
                                    Place On{" "}
                                    <span className="fw-bold text-body">
                                      {selectedBooking.createdAt
                                        ? new Date(selectedBooking.createdAt).toLocaleDateString()
                                        : "N/A"}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="card-body p-4">
                              <div className="d-flex flex-row mb-4 pb-2">
                                <div className="flex-fill">
                                  <h5 className="bold">
                                    {selectedBooking.hall?.hallName}
                                  </h5>
                                  <p className="text-muted">
                                    Booked For: {booking.totalDays} Days
                                  </p>
                                  <h4 className="mb-3">
                                    $ {selectedBooking.totalAmount}{" "}
                                    <span className="small text-muted">
                                      {" "}
                                      via (COD){" "}
                                    </span>
                                  </h4>
                                  <p className="text-muted p-2">
                                    Dates:{" "}
                                    <span className="text-body">
                                      {" "}
                                      {new Date(
                                        selectedBooking.startDate
                                      ).toLocaleDateString()}{" "}
                                      -{" "}
                                      {new Date(
                                        selectedBooking.endDate
                                      ).toLocaleDateString()}
                                    </span>
                                  </p>
                                  <p className="text-black">
                                    Status: {selectedBooking.status}
                                  </p>
                                </div>
                                <div>
                                  <img
                                    className=" h-auto max-w-lg rounded-lg shadow-xl dark:shadow-gray-800 p-1"
                                    src={selectedBooking.hall?.hallImage[0]}
                                    alt={`Hall Image `}
                                    width="250"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="card-footer p-4">
  <div className="d-flex justify-content-between">
    <h5 className="fw-normal mb-0">
      {selectedBooking.status !== 'canceled' && (
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
                  )}
                </React.Fragment>
              ))}
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
      <div className="flex justify-end">
      <button
    onClick={() => setCurrentPage(currentPage - 1)}
    className={`mx-1 px-3 py-2 rounded ${
      currentPage === 1
        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
        : 'bg-gray-700 text-white'
    }`}
    disabled={currentPage === 1}
  >
    <BsChevronLeft className="h-5 w-5" />
  </button>
        {[...Array(Math.ceil(bookingData.length / itemsPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-2 rounded ${
              currentPage === number + 1 ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {number + 1}
          </button>
        ))}
         <button
    onClick={() => setCurrentPage(currentPage + 1)}
    className={`mx-1 px-3 py-2 rounded ${
      currentPage === Math.ceil(bookingData.length / itemsPerPage)
        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
        : 'bg-gray-700 text-white'
    }`}
    disabled={currentPage === Math.ceil(bookingData.length / itemsPerPage)}
  >
    <BsChevronRight className="h-5 w-5" />
  </button>
      </div>

    </div>
  );
};

export default BookingList