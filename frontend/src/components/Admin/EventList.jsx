import React from 'react';
import { useFetchEventsMutation, useUpdateEventMutation} from '../../Slices/adminApiSlice';
import { useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { useAdminActionEventsMutation } from '../../Slices/adminApiSlice';



const EventList = () => {

  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const[editedEventType, setEditedEventtType] = useState('');
  const[editedEventImage, setEditedEventImage] = useState('');
  const [getEventData] = useFetchEventsMutation();
  const [toggleEventStatus] = useAdminActionEventsMutation();
  const[updateEventData] = useUpdateEventMutation();

  useEffect(() => {
    fetchEvents();
  }, []);


  const toggleEvent = async(eventId, eventStatus) => {
    try {
      const res = await toggleEventStatus({eventId,eventStatus});
      if(res.data.success) {
        setEventData((prevEventData) => 
          prevEventData.map((events) => 
            events._id===eventId ? {...events, isActive: !events.isActive} : events
          )
        )
      } 
  } catch (err) {
    toast.error(err?.data?.message || err.error);
  }
};

const handleEdit = (event) => {
  setSelectedEvent(event);
  setEditedDescription(event.description || '');
  setEditedEventtType(event.eventType || '');
  setEditedEventImage(event.eventImage || '')
  setIsModalOpen(true);
};
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  console.log(file,"ASZDVXCS")
  if(file) {
      try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'up0dzyua');
          formData.append('cloud_name', 'dszrxbtng');
          const response = await fetch('https://api.cloudinary.com/v1_1/dszrxbtng/image/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          console.log(data,"DATA")
          setEditedEventImage(data.secure_url);
          toast.success('Image uploaded successfully to Cloudinary');
      } catch (err) {
          toast.error('Error uploading image to Cloudinary');
      }
  }
}



const handleSaveEvent = async (editedEvent) => {
  const updatedEvent = {
    _id: selectedEvent._id,
    description: editedDescription,
    eventType: editedEventType,
    eventImage: editedEventImage,
  };
  console.log('Save banner:', updatedEvent);
  try {
  // Implement the logic to save the edited banner
 
  const res = await updateEventData(updatedEvent).unwrap();
  console.log(res,"GGGG")
  setIsModalOpen(false);
  await fetchEvents();
  } catch (err) {
    toast.error(err?.data?.message || err.error);
  }
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedEvent(null);
};

  const truncateDescription = (description, maxCharacters) => {
    if (description.length > maxCharacters) {
      const truncated = description.slice(0, maxCharacters);
      return `${truncated}...`;
    }
  
    return description;
  };

  const fetchEvents = async () => {
    try {
    const res = await getEventData().unwrap();
    const myEventsData = res.events;
    setEventData(myEventsData);
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  };

  return (
    <div>
            <Link to="/admin/events/new" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Create New Event
      </Link>
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Event List</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className='hidden'>ID</th>
              <th>Event Name</th>
              <th>Description</th>
              <th>Event Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {eventData && eventData.length > 0 ? (
              eventData.map((event) => (
                <tr key={event?._id}>
                  <td>{event?.eventType}</td>
                  <td>{truncateDescription(event?.description, 15)}</td>
                  <td>
                      {event?.eventImage && (
                        <img
                          src={event?.eventImage}
                          alt={event?.eventType}
                          width="50" // Set the width to your desired value
                          height="50" // Set the height to your desired value
                        />
                      )}
                    </td>

                  <td>
                  <button className='text-green-600' onClick={() => handleEdit(event)} ><FaEdit /></button>
                    <span className="relative inline-block px-3 py-1 mt-4 ml-3 font-semibold leading-tight">
                      <span
                        className={`absolute inset-0 rounded-full ${
                          event.isActive
                            ? "bg-green-200 opacity-50"
                            : "bg-red-200 opacity-50"
                        }`}
                      ></span>
                      <span
                        onClick={() => toggleEvent(event._id, event.isActive)}
                        className={`relative ${
                          event.isActive ? "text-green-900" : "text-red-900"
                        }`}
                      >
                        {event.isActive ? "Block" : "Activate"}
                      </span>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Modal for editing */}
    {isModalOpen && (
        <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-gray-800 w-full max-w-md p-4 rounded-lg">
          {/* Modal content */}
          <div className="relative">
            {/* Modal header */}
            <div className="flex items-center justify-between pb-4 border-b">
              <h3 className="text-lg font-semibold text-white">Edit Event
              e</h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form>
            <label htmlFor="page" className="block mb-2 mt-2 text-sm font-medium text-white">Event:</label>
              <input
                type="text"
                id="page"
                value={editedEventType}
                onChange={(e) => setEditedEventtType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter page"
              />
              <br />
              <label htmlFor="description" className="block mb-2 mt-2 text-sm font-medium text-white">Description:</label>
              <input
                type="text"
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter description"
              />
              <br />
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image URL:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
                <br />
                
              <div className="mt-4 flex space-x-4">
              <button
                type="button"
                onClick={handleSaveEvent}
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ms-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </div>



  )
}

export default EventList