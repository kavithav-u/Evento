import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";
import Loader from "../../components/user/Loader";
import { useServicesMutation } from "../../Slices/usersApiSlice";
import { toast } from "react-toastify";

const Events = () => {
  const [eventData, setEventData] = useState([]);
  const [getEventData, { isLoading }] = useServicesMutation();
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEventData().unwrap();
      const myBanner = res.Banners;
      const myEventsData = res.events;
      setBanner(myBanner);
      setEventData(myEventsData);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="banner relative">
        <img
          loading="lazy"
          src={banner.image}
          alt="Banner Image"
          className="object-cover h-96 w-full"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black to-transparent opacity-70"></div> */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Our Services</h1>
          {/* <p className="text-lg md:text-2xl mt-4">Your banner description goes here.</p> */}
        </div>
      </div>

      <div className="flex items-center justify-center flex-col h-[600px] bg-white">
        <h2 className="text-gray-600 body-font font-adelia">We Offer</h2>
        {isLoading ? (
          // Render Loader component while events are being fetched
          <Loader />
        ) : (
          <Swiper
            breakpoints={{
              340: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              700: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
            }}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="max-w-[100%] lg:max-w-[80%]"
          >
            {" "}
            {eventData.map((event, index) => (
              <SwiperSlide key={index}>
                <Link to={`/listing/${event._id}`} className="no-underline">
                  <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-black rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${event?.eventImage})` }}
                    />
                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
                    <div className="relative flex flex-col gap-3">
                      {/* <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" /> */}
                      <h1 className="text-xl lg:text-2xl text-white">
                        {event?.eventType}{" "}
                      </h1>
                      <p className="lg:text-[18px] text-white">
                        {event?.description}{" "}
                      </p>
                    </div>
                    <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default Events;
