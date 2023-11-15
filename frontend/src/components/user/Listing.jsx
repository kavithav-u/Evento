import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchListingMutation, useFetchCateringDetailsMutation } from '../../Slices/usersApiSlice.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import {toast} from 'react-toastify';


const Listing = () => {
  const { eventId } = useParams();
  const [halls, setHalls] = useState([]);
  const[catering,setCatering] = useState([]);
  const [fetchHallsByEventId] = useFetchListingMutation();
  const[fetchCateringsByEventId] = useFetchCateringDetailsMutation();

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetchHallsByEventId(eventId).unwrap();
      setHalls(response.halls);
      setCatering(response.caterings);
    } catch (error) {
      toast.error(err?.data?.message || err.error)
    }
  };

  return (
    <div>
        <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600 pl-12'>Banquet Halls</h2>
            </div>
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
      {halls.map((hall) => (
        <div key={hall._id} className="bg-gray-500 mb-2 rounded-2xl p-2 text-center w-64">
            <Link to={`/details/${hall._id}`} className="no-underline">
          <Swiper slidesPerView={1} spaceBetween={10}>
            {hall.hallImage &&
              hall.hallImage.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="rounded-2xl object-cover w-60 h-60 mx-auto"
                    src={image}
                    alt={`Image ${index}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          </Link>
          <h2 className="font-bold text-sm mt-2">{hall.location}</h2>
          <h3 className="text-xs text-gray-500 mt-1">{hall.capacity}</h3>
          <div className="mt-1">
            <span className="font-bold text-sm">${hall.pricePerDay}</span> per night
          </div>
        </div>
      ))}
      </section >

      <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600 pl-12'>Food and Beverages</h2>
            </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {catering.map((cateringItem) => (
          <div key={cateringItem._id} className="bg-gray-500 mb-2 rounded-2xl p-2 text-center w-64">
            <Link to={`/details/${cateringItem._id}`}>
            <Swiper slidesPerView={1} spaceBetween={5}>
          {cateringItem.itemImages &&
            cateringItem.itemImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className="rounded-2xl object-cover w-60 h-60 mx-auto"
                  src={image}
                  alt={`Image ${index}`}
                />
              </SwiperSlide>
            ))}
        </Swiper>          
        </Link>
        <h2 className="text-xs text-gray-500 mt-1">{cateringItem.itemName}</h2>
        <h3 className="font-bold text-sm mt-2">{cateringItem.price}</h3>
          </div>
        ))}
      </section>

    </div>
  );
};

export default Listing;
