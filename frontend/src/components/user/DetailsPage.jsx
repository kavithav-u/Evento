import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchCateringDetailsMutation, useFetchDetailsMutation } from '../../Slices/usersApiSlice.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { ImLocation } from 'react-icons/im';
import {toast} from 'react-toastify';
import { FaShower, FaMapMarkerAlt  } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdReviews, MdMeetingRoom } from "react-icons/md";
import Calender from './Calender.jsx';


const DetailsPage = () => {
  const { hallId, cateringId } = useParams();
  const [halls, setHalls] = useState([]);
  const [catering, setCatering] = useState([]);
  const [fetchHallsByEventId] = useFetchDetailsMutation();
  const [fetchCateringsByEventId] = useFetchCateringDetailsMutation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (cateringId) {
      fetchCateringData();
    }
  }, [cateringId]);
  const fetchCateringData = async () => {
    try {
      const response = await fetchCateringsByEventId(cateringId).unwrap();
      setCatering(response.Catering);
    } catch (error) {
      toast.error(err?.data?.message || err.error)
    }
  };

  // Fetch halls based on the event ID
  const fetchData = async () => {
    try {
      const response = await fetchHallsByEventId(hallId).unwrap();
      setHalls(response.Halls);
    } catch (error) {
      toast.error(err?.data?.message || err.error)
    }
  };

  return (
    <main>
      <div>
<div className="wrapper">
        <div className="flexColStart paddings innerWidth property-container">
          {/* image */}
          <div className="bg-white-500 mb-2 rounded-2xl overflow-hidden">
            <Swiper>
              {halls.map((hall) => (
                  hall.hallImage.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className=" p-3 w-full h-96 rounded-2xl object-cover aspect-square"
                    src={hall.hallImage[0]}  // Assuming the first image in the array
                    alt={`Hall Image for ${hall.hallName}`}
                  />
                </SwiperSlide>
                  ))
              ))}
            </Swiper>
            </div>
            </div>
            </div >

            {halls && halls.length > 0 && (
  <div className="w-full px-5 flex flex-wrap">
    {/* Display hall details for each matched hall */}
    <div className="w-full md:w-1/2 lg:w-2/3 px-3">
      {halls.map((hall) => (
        <div key={hall._id} className="mb-6">
          <p className="text-2xl font-semibold text-black">{hall.hallName}</p>
          <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
            <FaMapMarkerAlt className="text-green-700" />
            {hall.location}
            <MdReviews className='text-blue-700'>Reviews</MdReviews>
          </p>
          <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
            Price: Rs.{hall.pricePerDay}
          </p>
          <p className="text-slate-800">
            <div className="font-semibold text-black">Capacity -{hall.capacity}</div>
          </p>
          <div className="font-semibold text-black whitespace-pre-line">
            Description: {hall.description}
          </div>
        </div>
      ))}
    </div>

    {/* Second column for calendar */}
    <div className="w-full md:w-1/2 lg:w-1/3 px-3">
      <Calender />
      {/* Add your calendar component here */}
    </div>

    <div className="w-full mt-6">
      <button className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-2 m-3'>
        Book Now
      </button>
    </div>
  </div>
)}

    </div>
  </main>
  );
};

export default DetailsPage;
