
import React from 'react';
import PropTypes from 'prop-types';


const EventCard = ({ event, onClick }) => {
  const id = event._id;
  console.log(id,"eventIDs")
  console.log(event,"event");
  
  return (
    <div className="event-card" onClick={() => onClick(id)}>
    <div
  className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md  mt-3 mr-4">
  <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
  <img src={event?.eventImage} alt={event.eventType} />
  </div>
  <div className="p-6">
    <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
    {event?.eventType}
    </h4>
    <p className="block mt-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
    {truncateDescription(event?.description, 65)}
    </p>
  </div>
  
</div>
</div>
  );
};
export {
  EventCard, 
}

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    eventImage: PropTypes.string.isRequired,
    eventType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Add more properties as needed
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};


// utils.js
export const truncateDescription = (description, maxCharacters) => {
  if (description.length > maxCharacters) {
    const truncated = description.slice(0, maxCharacters);
    return `${truncated}...`;
  }

  return description;
};



