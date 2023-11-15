import React, { useState, useEffect } from 'react'
import { useCreateCateringMutation, useFetchCateringsToHallsMutation } from '../../Slices/adminApiSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const CreateNewCatering = () => {

  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURLs, setImageURLs] = useState([]);
  const [isVeg, setIsVeg] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(''); 
  const [events, setEvents] = useState([]);
  const [createCatering] = useCreateCateringMutation();
  const [fetchCateringsFromServer] = useFetchCateringsToHallsMutation();


  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsFromServer = await fetchCateringsFromServer().unwrap();
      setEvents(eventsFromServer.events);
    } catch (error) {
      toast.error(err?.data?.message || err.error)
    }
  };
  const handleImageUpload = async (e) => {
      const files = Array.from(e.target.files);
      const imageUrls = [];
      for (const file of files) {
        // Upload the image to Cloudinary
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
          imageUrls.push(data.secure_url);
          toast.success('Image uploaded successfully ');
        } catch (error) {
          toast.error('Error uploading image to Cloudinary');
        }
        setImageURLs([...imageURLs, ...imageUrls]);
  }
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const catering = {
        itemName,
        description,
        itemImages:imageURLs,
        price, 
        isVeg,
        events : selectedEvent
      }
      const res = await createCatering(catering).unwrap();
   if (res.success) {
        toast.success("New item added Successfully");
        navigate('/admin/caterings')
      } else {
        toast.error(res.message || "An error occurred");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Create New Hall
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="border p-3 rounded-lg "
        >
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.eventType}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <select
          value={isVeg}
          onChange={(e) => setIsVeg(e.target.value === 'true')}
          className="border p-3 rounded-lg"
        >
          <option value={true}>Vegetarian</option>
          <option value={false}>Non-Vegetarian</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
          className="border p-3 rounded-lg"
          multiple
        />

        {imageURLs.length > 0 && (
          <div>
            {imageURLs.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded Image ${index}`}
                style={{ maxWidth: "50px" }}
              />
            ))}
          </div>
        )}

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Create
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Return to the <Link to="/admin/caterings">Back</Link>
        </p>
      </div>
    </div>
  );
}

export default CreateNewCatering