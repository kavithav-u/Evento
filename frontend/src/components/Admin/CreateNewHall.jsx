import React, { useState , useEffect} from 'react'
import { useCreateHallsMutation, useFetchEventsToHallsMutation } from '../../Slices/adminApiSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate} from 'react-router-dom';

const CreateNewHall = () => {

    const [hallName, setHallName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [capacity, setCapacity] = useState('');
    const [catering, setCatering] = useState(false);
    const [decoration,setDecoration] = useState(false);
    const [parking, setParking] = useState(false);
    const [isAc, setIsAc] = useState(false);
    const [photography, setPhotography] = useState(false);
    const [imageURLs, setImageURLs] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(''); 
    const [events, setEvents] = useState([]);
    const [createHall] = useCreateHallsMutation();
    const [fetchEventsFromServer] = useFetchEventsToHallsMutation();

    const navigate = useNavigate();


    useEffect(() => {
      fetchEvents();
    }, []);

    const fetchEvents = async () => {
      try {
        const eventsFromServer = await fetchEventsFromServer().unwrap();
        setEvents(eventsFromServer.events);
      } catch (error) {
        console.error(error);
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
        toast.success('Image uploaded successfully to Cloudinary');
      } catch (error) {
        toast.error('Error uploading image to Cloudinary');
        console.error(error);
      }
      setImageURLs([...imageURLs, ...imageUrls]);
}
}

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const hall = {
                hallName, 
                description, 
                location,
                pricePerDay,
                capacity,
                catering,
                decoration,
                parking,
                isAc,
                photography,
                hallImage: imageURLs,
                events : selectedEvent
            }
            const res = await createHall(hall).unwrap();
            toast.success("New Hall added successfully");
            navigate('/admin/halls');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Create New Hall</h1>
      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Hall Name'
          value={hallName}
          onChange={(e) => setHallName(e.target.value)}
          className='border p-3 rounded-lg'
        />
        <textarea
          placeholder='Hall Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border p-3 rounded-lg'
        />
        <input
          type='text'
          placeholder='Hall Location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className='border p-3 rounded-lg'
        />
        <div class="relative w-full overflow-hidden">

        <input
          type='number'
          placeholder='PricePerDay'
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          class="border p-3 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300 appearance-none custom-number-input"
          />
          </div >
          


        <input
          type='text'
          placeholder='Capacity'
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className='border p-3 rounded-lg'
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
        <label>
    <input
      type='checkbox'
      checked={catering}
      onChange={(e) => setCatering(e.target.checked)}
    />
    Catering
  </label>
  <label>
    <input
      type='checkbox'
      checked={decoration}
      onChange={(e) => setDecoration(e.target.checked)}
    />
    Decorations
  </label>
  <label>
    <input
      type='checkbox'
      checked={parking}
      onChange={(e) => setParking(e.target.checked)}
    />
    Parking
  </label>
  <label>
    <input
      type='checkbox'
      checked={isAc}
      onChange={(e) => setIsAc(e.target.checked)}
    />
    Is Ac
  </label>
  <label>
    <input
      type='checkbox'
      checked={photography}
      onChange={(e) => setPhotography(e.target.checked)}
    />
    Photography
  </label>
        <input
          type='file'
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
          className='border p-3 rounded-lg'
          multiple
        />

        {imageURLs.length>0 && (
 <div>
 {imageURLs.map((url, index) => (
     <img
         key={index}
         src={url}
         alt={`Uploaded Image ${index}`}
         style={{ maxWidth: '50px' }}
     />
 ))}
</div>
        )}

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Create
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>
          Return to the <Link to='/admin/halls'>Back</Link>
        </p>
      </div>
    </div>
  )
}

export default CreateNewHall