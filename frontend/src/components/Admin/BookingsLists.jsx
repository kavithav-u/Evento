import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useFetchUserBookingsMutation, useAdminActionBookingMutation } from '../../Slices/adminApiSlice';
import Switch from 'react-switch';

const BookingsLists = () => {
  const [bookingData, setBookingData] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [fetchBookingsApi] = useFetchUserBookingsMutation();
  const [fetchAdminAction] = useAdminActionBookingMutation();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetchBookingsApi().unwrap();
      const Booking = res.bookings;
      setBookingData(Booking);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleChange = async (isChecked, bookingId) => {
    try {
      console.log("Booking ID:", bookingId);
  
      const response = await fetchAdminAction({ bookingId }).unwrap();
      console.log(response, "response");
  
      const updatedBooking = response.booking;
      console.log("Updated Booking:", updatedBooking);
  
      // // Update the state based on the updated status
      // setCheckedState((prevState) => ({
      //   ...prevState,
      //   [bookingId]: updatedBooking.status === 'confirmed',
      // }));
  
      fetchBookings();
  
      toast.success("Booking updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
                      <label className="flex items-center">
                        <Switch
                          onChange={(isChecked) => handleChange(isChecked, booking?._id)}
                          checked={checkedState[booking?._id] || false}
                        />
                      </label>
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
        </div>
      </div>
    </div>
  );
};

export default BookingsLists;
