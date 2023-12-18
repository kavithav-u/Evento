import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useFetchUserBookingsMutation,
  useAdminActionBookingMutation,
} from "../../Slices/adminApiSlice";
import Switch from "react-switch";
import BookingModal from "./modal";
import Loader from "../user/Loader";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


const BookingsLists = () => {
  const [bookingData, setBookingData] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [fetchBookingsApi, {isLoading}] = useFetchUserBookingsMutation();
  const [fetchAdminAction] = useAdminActionBookingMutation();

  useEffect(() => {
    const storedCheckedState =
      JSON.parse(localStorage.getItem("checkedState")) || {};
    setCheckedState(storedCheckedState);

    fetchBookings();
  }, [currentPage]);

  const fetchBookings = async () => {
    try {
      const res = await fetchBookingsApi().unwrap();
      const Booking = res.bookings;

      const initialCheckedState = Booking.reduce((acc, booking) => {
        acc[booking?._id] = booking.status === "confirmed";
        return acc;
      }, {});

      setCheckedState(initialCheckedState);

      setBookingData(Booking);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleChange = async (isChecked, bookingId) => {
    try {
      setCheckedState((prevState) => ({
        ...prevState,
        [bookingId]: isChecked,
      }));

      const response = await fetchAdminAction({
        bookingId,
        action: isChecked ? "confirm" : "cancel",
      }).unwrap();

      if (!response.success) {
        toast.error(response.error || "An error occurred");
        setCheckedState((prevState) => ({
          ...prevState,
          [bookingId]: !isChecked,
        }));
        return;
      }

      const updatedBooking = response.statusUpdate;
      console.log(updatedBooking);

      fetchBookings();

      toast.success("Booking updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookingData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(bookingData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <strong className="text-gray-700 font-medium">Booking List</strong>
        <div className="border-x border-gray-200 rounded-sm mt-3">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th className="hidden">ID</th>
                <th>User Name</th>
                <th>Event</th>
                <th>Hall</th>
                <th>Total Amount</th>
                <th>Order Status</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {isLoading ? (
 <tr>
 <td colSpan="5">
   <div className="flex justify-center items-center py-8">
     <Loader />
   </div>
 </td>
</tr>              ) : (
              currentItems && currentItems.length > 0 ? (
                currentItems.map((booking) => (
                  <tr key={booking?._id}>
                    <td className="flex flex-col mb-2">
                      <img
                      loading="lazy"
                        src={booking?.user.image}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full mb-2 mt-2 ml-9"
                      />
                      <div>{booking?.user.name}</div>
                    </td>
                    <td>{booking?.hall.events.eventType}</td>
                    <td>{booking?.hall.hallName}</td>
                    <td>{booking?.totalAmount}</td>
                    <td>{booking?.status}</td>
                    <td>
                      <button onClick={() => openModal(booking)}>
                        view Details
                      </button>
                    </td>
                    <td>
                      {booking?.status !== "canceled" ? (
                        <label className="flex items-center">
                          <Switch
                            onChange={(isChecked) =>
                              handleChange(isChecked, booking?._id)
                            }
                            checked={checkedState[booking?._id] || false}
                          />
                        </label>
                      ) : (
                        <span>{booking?.status}</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No Booking found.</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>

          {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 px-4 py-2 bg-slate-200 text-black rounded-md"
          >
            <BsChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-2 px-4 py-2 ${
                currentPage === i + 1
                  ? "bg-slate-200 text-black"
                  : "bg-white text-gray-700"
              } rounded-md`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-2 px-4 py-2bg-slate-200 text-black rounded-md"
          >
            <BsChevronRight />
          </button>
        </div>
      )}
          {/* Modal for booking details */}
          <BookingModal
            isOpen={isModalOpen}
            onClose={closeModal}
            booking={selectedBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingsLists;
