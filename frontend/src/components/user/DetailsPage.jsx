import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector  } from "react-redux";
import { useFetchCateringDetailsMutation, useFetchDetailsMutation,useFetchBookingsMutation, useCreateBookingsMutation } from '../../Slices/usersApiSlice.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import {toast} from 'react-toastify';
import {FaMapMarkerAlt  } from "react-icons/fa";
import { MdReviews } from "react-icons/md";

Modal.setAppElement('#root'); // Set the root element for accessibility

const DetailsPage = () => {
  const { hallId, cateringId } = useParams();
  const [halls, setHalls] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [catering, setCatering] = useState([]);
  const [fetchHallsByEventId] = useFetchDetailsMutation();
  const [fetchCateringsByEventId] = useFetchCateringDetailsMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalDays, setTotalDates] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const navigate = useNavigate();
  const [fetchBookings] = useFetchBookingsMutation();
  const [createBookings] = useCreateBookingsMutation();
  const {userInfo} = useSelector((state) => state.auth);



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (cateringId) {
      fetchCateringData();
    }
  }, [cateringId]);

  useEffect(() => {
    if (startDate && endDate) {
    calculateDays(startDate, endDate),
    calculateTotalAmount(totalDays)
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (totalDays) {
    calculateTotalAmount(totalDays)
    }
  }, [totalDays]);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fetch halls based on the event ID
  const fetchData = async () => {
    try {
      const response = await fetchHallsByEventId(hallId).unwrap();
      setBookings(response.bookings);
      setHalls(response.Halls);
    } catch (error) {
      toast.error(err?.data?.message || err.error)
    }
  };

  const calculateDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
    setTotalDates(days);
  };
  
  const calculateTotalAmount = (totalDays) => {
    const pricePerDay =  halls[0].pricePerDay;
    const price =  totalDays * pricePerDay;
    setTotalAmount(price)
  };

  const handleSaveDetails = async () => {
    try {
      if (!userInfo) {
        // If userInfo is not available, redirect to the sign-in page
        navigate('/login');
        return;
      } else {
          const booking = {
            hall: halls[0]._id,
            startDate: startDate,
            endDate: endDate,
            totalAmount: totalAmount,
            totalDays: totalDays,
            user: userInfo._id
          };
  
          const res = await createBookings(booking).unwrap();
          navigate('/bookings');
        }
      
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  const handleCheckDates = async () => {
    try {
      const isDateBooked = checkDateAvailability(startDate, endDate,bookings);
      if (isDateBooked === true) {
        toast.warning('This date and hall are already booked. Please select another date or hall.');
      } else {
        toast.warning('This date and hall are availabl');
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }
  
  const checkDateAvailability = async (startDate, endDate, bookings) => {
    // Iterate through existing bookings
    for (const booking of bookings) {
      const bookedStartDate = new Date(booking.startDate);
      const bookedEndDate = new Date(booking.endDate);

      // Check if there is an overlap in date ranges
      if (
        (startDate >= bookedStartDate && startDate <= bookedEndDate) ||
        (endDate >= bookedStartDate && endDate <= bookedEndDate) ||
        (startDate <= bookedStartDate && endDate >= bookedEndDate)
      ) {
        // There is an overlap, the date is already booked
        return true;
      }
    }
    // No overlap, the date is available
    return false;
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  
  const SubmitPayment = async (totalAmount) => {
    const userId = userInfo?._id;
    const key = "rzp_test_XlE6d2kpU2fO5P";
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    const options = {
      key: key,
      amount: totalAmount * 100, // Amount in smallest currency unit (e.g., paise in INR)
      currency: "INR",
      name: "Evento",
      description: "Payment for the booking",
      handler: async function (response) {
        await handleSaveDetails();
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

const HandleStartDateChange = (date) => {
  setStartDate(date);
};

const HandleEndDateChange = (date) => {
  setEndDate(date);
};
const swiperParams = {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // Add any other Swiper parameters you need
};
  return (
    <main>
      <div>
        <div className="wrapper">
          <div className="flexColStart paddings innerWidth property-container">
            {/* image */}
            <div className="bg-white-500 mb-2 rounded-2xl overflow-hidden">
            {halls.map((hall) =>
            <Swiper navigation>
            {hall.hallImage.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
            )}
            </div>
          </div>
        </div>

        {halls && halls.length > 0 && (
          <div className="w-full px-5 flex flex-wrap">
            {/* Display hall details for each matched hall */}
            <div className="w-full md:w-1/2 lg:w-2/3 px-3">
              {halls.map((hall) => (
                <div key={hall._id} className="mb-6">
                  <p className="text-2xl font-semibold text-black">
                    {hall.hallName}
                  </p>
                  <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
                    <FaMapMarkerAlt className="text-green-700" />
                    {hall.location}
                    <MdReviews className="text-blue-700">Reviews</MdReviews>
                  </p>
                  <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    Price: Rs.{hall.pricePerDay}
                  </p>
                  <div className="text-slate-800">
                    <div className="font-semibold text-black">
                      Capacity -{hall.capacity}
                    </div>
                  </div>
                  <div className="font-semibold text-black whitespace-pre-line">
                    Description: {hall.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Second column for calendar */}
            <div className="w-full md:w-1/2 lg:w-1/3 pt-9 px-4">
            <div className="hotelDetails bg-emerald-100 rounded-2xl">

              <div className="hotelDetailsPrice">
                <h2 className='text-center p-2  text-slate-500'>Perfect for {totalDays} days-night stay!</h2>
                <span className='p-3'>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h3>
                  <b className='font-poppins p-20'>$ {totalAmount}    day</b>
                </h3>
                <button 
                  onClick={() => SubmitPayment(totalAmount)}
                  className="bg-green-950 w-full max-w-[200px] text-white text-center p-1 rounded-md mx-auto block">
                  Book Now!
                </button>

              </div>
            </div>
              {/* Add your calendar component here */}
            </div>

            <div className="w-full mt-6">
              <button
                onClick={toggleDropdown}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-2 m-3"
              >
                Check Availability
              </button>
            </div>
          </div>
        )}

{/* Dropdown */}
{isDropdownOpen && (
  <div className="dropdown dropdown-end ml-5">
    <label
      tabIndex={0}
      className="btn btn-ghost btn-circle avatar"
      onClick={toggleDropdown}
    >
      <div className="w-10 rounded-full">
        {/* Your avatar image */}
      </div>
    </label>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-transparent rounded-box w-72 bg-white"
    >
      {/* Dropdown menu items */}
      <div className="flex flex-col space-y-4 items-center">
        <div className="flex space-x-4">
          <DatePicker
            selected={startDate}
            onChange={(date)=>HandleStartDateChange(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholderText="From"
          />
          <DatePicker
            selected={endDate}
                onChange={(date)=>HandleEndDateChange(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholderText="To"
          />
        </div>
        <button
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-2 w-full"
          onClick={handleCheckDates}
        >
          Reserve Now
        </button>
      </div>
    </ul>
  </div>
)}

      
      </div>
    </main>
  );
};

export default DetailsPage;
