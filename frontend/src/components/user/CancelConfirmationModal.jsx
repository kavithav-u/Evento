import React from "react";

const CancelConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-8 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-6">Cancel Booking Confirmation</h2>
        <p className="mb-4">Are you sure you want to cancel this booking?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
            onClick={onCancel}
          >
            Close
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationModal;
