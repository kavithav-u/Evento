import React from 'react';
import Modal from 'react-modal';

const BookingModal = ({ isOpen, onClose, booking }) => {
  return (

    <div>
         <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Booking Details"
      className= 'fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center'
    >
<div className="bg-gray-800 w-full max-w-md p-4 rounded-lg  text-white" onClick={onClose}>
        <div className="w-2/2 p-4 rounded-lg shadow-md text-white">
          <img
            src={booking?.hall?.hallImage[0]}
            alt="Hall Image"
            className="w-full h-auto mb-4 rounded-t-lg"
          />
          <h2 className="text-2xl  text-white font-bold mb-2">{booking?.hall?.hallName}</h2>
          <p className="text-white mb-2">
            <span className="font-semibold">Location:</span> {booking?.hall?.location}
          </p>
          <p className="text-white mb-2">
            <span className="font-semibold">Booked For:</span>{' '}
            {new Date(booking?.startDate).toLocaleDateString()} - {new Date(booking?.endDate).toLocaleDateString()}
          </p>
          <p className="text-white mb-2">
            <span className="font-semibold">Booking Date:</span>{' '}
            {new Date(booking?.createdAt).toLocaleDateString()}
          </p>
          <p className=" text-white mb-2">
            <span className="font-semibold">Total Amount:</span> ${booking?.totalAmount}
          </p>
          {/* Add more details as needed */}
          <button
            
            className="bg-gray-500 text-white py-2 px-4 rounded mt-3 hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
    </div>
  )
}

export default BookingModal