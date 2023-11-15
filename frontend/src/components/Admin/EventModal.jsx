// EventModal.js
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for screen readers

const EventModal = ({ isOpen, isClose, onAddEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const { mutate } = useMutation(onAddEvent);

  const handleAddEvent = () => {
    mutate({
      name: eventName,
      description: eventDescription,
    });

    isClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      isClose={isClose}
      contentLabel="Add Event Modal"
    >
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Add Event</h2>
        <div className="mb-4">
          <label htmlFor="eventName" className="block text-gray-700 font-semibold mb-2">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            className="w-full px-3 py-2 border rounded-md border-gray-300"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventDescription"
            className="block text-gray-700 font-semibold mb-2"
          >
            Event Description
          </label>
          <textarea
            id="eventDescription"
            className="w-full px-3 py-2 border rounded-md border-gray-300"
            placeholder="Enter event description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={handleAddEvent}
        >
          Add Event
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          onClick={isClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EventModal;
