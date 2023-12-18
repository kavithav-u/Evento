import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useFetchDetailsMutation,
  useCreateBookingsMutation,
  useNewReviewMutation,
} from "../../Slices/usersApiSlice.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import DatePicker from "react-datepicker";
import Loader from "../../components/user/Loader";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import Map from "./Map.jsx";

Modal.setAppElement("#root");

const DetailsPage = () => {
  const { hallId, cateringId } = useParams();
  const [halls, setHalls] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [fetchHallsByEventId, { isLoading }] = useFetchDetailsMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalDays, setTotalDates] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [bookedDates,setBookedDates] = useState([])
  const navigate = useNavigate();
  const [createBookings] = useCreateBookingsMutation();
  const [createReviewApi] = useNewReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const _id = userInfo._id;
  const toggleReviewModal = () => {
    setIsReviewModalOpen(!isReviewModalOpen);
  };

  const handleReviewSubmission = async (e) => {
    try {
      const review = {
        rating,
        comment,
        _id,
        hallId: hallId,
      };

      const res = await createReviewApi(review).unwrap();
      // console.log("res of review", res);

      // Close the review modal
      setIsReviewModalOpen(false);

      // Show a success toast or message
      toast.success("Review submitted successfully!");
    } catch (error) {
      // Handle error, show error toast or message
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (startDate && endDate) {
      calculateDays(startDate, endDate), calculateTotalAmount(totalDays);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (totalDays) {
      calculateTotalAmount(totalDays);
    }
  }, [totalDays]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fetch halls based on the event ID
  const fetchData = async () => {
    try {
      const response = await fetchHallsByEventId(hallId).unwrap();
      console.log(response,"Bookings")
      setBookings(response.bookings);
      setHalls(response.Halls);
      const extractedBookedDates = response.bookings.map((booking) => ({
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
      }));
      setBookedDates(extractedBookedDates);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  console.log(bookedDates,"bookedDates")
  const flattenedBookedDates = bookedDates.reduce(
    (dates, booking) => [...dates, booking.startDate, booking.endDate],
    []
  );
  console.log(flattenedBookedDates, 'flattenedBookedDates')


  const isDateBooked = (date) => {
    return bookedDates.some(
      (booking) =>
        date >= booking.startDate && date <= booking.endDate
    );
  };
  
  const calculateDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
    setTotalDates(days);
  };

  const calculateTotalAmount = (totalDays) => {
    const pricePerDay = halls[0].pricePerDay;
    const price = totalDays * pricePerDay;
    setTotalAmount(price);
  };

  const handleSaveDetails = async () => {
    try {
      if (!userInfo) {
        // If userInfo is not available, redirect to the sign-in page
        navigate("/login");
        return;
      } else {
        const booking = {
          hall: halls[0]._id,
          startDate: startDate,
          endDate: endDate,
          totalAmount: totalAmount,
          totalDays: totalDays,
          user: userInfo._id,
        };

        const res = await createBookings(booking).unwrap();
        console.log(res,"respoice")
        navigate("/bookings");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  const handleCheckDates = async () => {
    try {
      const isDateBooked = await checkDateAvailability(startDate, endDate, bookings);
      console.log(isDateBooked,'isDateBooked')
      if (isDateBooked === true) {
        toast.warning(
          "Already booked. Please select another date or hall."
        );
      } else {
        toast.warning("This date and hall are available");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const checkDateAvailability = async (startDate, endDate, bookings) => {
    // Iterate through existing bookings
    for (const booking of bookings) {

      const bookedStartDate = new Date(booking.startDate).toLocaleDateString();
    const bookedEndDate = new Date(booking.endDate).toLocaleDateString();

    // Convert the selected startDate and endDate to JavaScript Date objects
    const selectedStartDate = new Date(startDate).toLocaleDateString();
    const selectedEndDate = new Date(endDate).toLocaleDateString();

      console.log(bookedStartDate,'bookedStartDate')
      console.log(bookedEndDate,'bookedEndDate')
      // Extract the date part without the time component for the selected dates
      console.log(selectedStartDate,'selectedStartDate')
      console.log(selectedEndDate,'selectedEndDate')

  
      // Check if there is an overlap in date ranges
      if (
        (selectedStartDate >= bookedStartDate && selectedStartDate <= bookedEndDate) ||
        (selectedEndDate >= bookedStartDate && selectedEndDate <= bookedEndDate) ||
        (selectedStartDate <= bookedStartDate && selectedEndDate >= bookedEndDate)
      ) {
        // There is an overlap, the date is already booked
        console.log("enereted")
        return true;
      }
    }
  
    // No overlap, the date is available
    console.log("false")
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
    // console.log(userId)
    const key = "rzp_test_XlE6d2kpU2fO5P";
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    // console.log(res)
    const options = {
      key: key,
      amount: totalAmount * 100, // Amount in smallest currency unit (e.g., paise in INR)
      currency: "INR",
      name: "Evento",
      description: "Payment for the booking",
      handler: async function (response) {
        await handleSaveDetails();
      },
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
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Add any other Swiper parameters you need
  };
  return (
    <main>
      <div>
        <div className="wrapper">
          <div className="flexColStart paddings innerWidth property-container">
            {/* image */}
            {isLoading ? (
              <div className="w-full h-56">
                <Loader />
              </div>
            ) : (
              <div className="bg-white-500 mb-2 rounded-2xl overflow-hidden">
                {halls.map((hall) => (
                  <Swiper key={hall._id} navigation>
                    {hall.hallImage.map((url) => (
                      <SwiperSlide key={url}>
                        <div
                          className="h-[550px]"
                          style={{
                            background: `url(${url}) center no-repeat`,
                            backgroundSize: "cover",
                          }}
                        ></div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ))}
              </div>
            )}
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
            <div
              className="w-full md:w-1/2 lg:w-1/3 px-3"
              style={{ height: "40vh" }}
            >
              <Map location={halls.length > 0 ? halls[0].location : null} />
            </div>
           

            <div className="w-full mt-6">
              <button
                onClick={toggleDropdown}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-2 m-3"
              >
                Check Availability
              </button>
              <button
                onClick={toggleReviewModal}
                className="bg-slate-500 text-white rounded-lg uppercase hover:opacity-95 p-2 m-3"
              >
                Add Review
              </button>

               {/* Second column for calendar */}
            <div className="w-full md:w-1/2 lg:w-1/3 pt-9 px-4">
              <div className="hotelDetails bg-emerald-100 rounded-2xl">
                <div className="hotelDetailsPrice">
                  <h2 className="text-center p-2  text-slate-500">
                    Perfect for {totalDays} days-night stay!
                  </h2>
                  <span className="p-3">
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h3>
                    <b className="font-poppins p-20">$ {totalAmount} day</b>
                  </h3>
                  <button
                    onClick={() => SubmitPayment(totalAmount)}
                    className="bg-green-950 w-full max-w-[200px] text-white text-center p-1 rounded-md mx-auto block"
                  >
                    Book Now!
                  </button>
                </div>
              </div>
              {/* Add your calendar component here */}
            </div>
           

              {/* Review Modal */}
              {isReviewModalOpen && (
                <div className="fixed inset-0 overflow-y-auto z-10 pt-1">
                  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* Background overlay */}
                    <div className="fixed inset-0 transition-opacity">
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    {/* Centered modal content */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    &#8203;
                    <div
                      className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="modal-headline"
                    >
                      <div className="bg-white p-6">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="modal-headline"
                        >
                          Add Review
                        </h2>
                        <div className="mt-2">
                          {/* Review Form */}
                          <label className="block text-sm font-medium text-gray-700">
                            Rating:
                            <input
                              type="number"
                              name="rating"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                              className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 w-full"
                            />
                          </label>
                          <label className="block text-sm font-medium text-gray-700 mt-2">
                            Comment:
                            <textarea
                              name="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 w-full"
                            />
                          </label>
                        </div>
                        <div className="mt-4">
                          {/* Submit Button */}
                          <button
                            type="button"
                            onClick={handleReviewSubmission}
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
              <div className="w-10 rounded-full">{/* Your avatar image */}</div>
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
                    onChange={(date) => HandleStartDateChange(date)}
                    selectsStart
                    minDate={new Date()}
                    startDate={startDate}
                    endDate={endDate}
                    highlightDates={flattenedBookedDates}
                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholderText="From"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => HandleEndDateChange(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    highlightDates={flattenedBookedDates}
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
