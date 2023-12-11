import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useFetchUserBookingsMutation,
  useAdminActionBookingMutation,
} from "../../Slices/adminApiSlice";
import Switch from "react-switch";
import BookingModal from "./modal";

const BookingsLists = () => {
  const [bookingData, setBookingData] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [fetchBookingsApi] = useFetchUserBookingsMutation();
  const [fetchAdminAction] = useAdminActionBookingMutation();

  useEffect(() => {
    const storedCheckedState =
      JSON.parse(localStorage.getItem("checkedState")) || {};
    setCheckedState(storedCheckedState);

    fetchBookings();
  }, []);

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
              {bookingData && bookingData.length > 0 ? (
                bookingData.map((booking) => (
                  <tr key={booking?._id}>
                    <td className="flex flex-col mb-2">
                      <img
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
              )}
            </tbody>
          </table>
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
