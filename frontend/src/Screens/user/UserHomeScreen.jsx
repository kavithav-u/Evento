import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/user/userHeader.jsx';
import Footer from '../../components/user/Footer.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Corrected import

import { toast } from 'react-toastify';
import { useFetchHomeMutation } from '../../Slices/usersApiSlice.js';
import { EventCard } from '../../components/user/Banner.jsx';

const UserHomeScreen = () => {
  const [banner, setBanner] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [fetchHome] = useFetchHomeMutation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetchHome().unwrap();
      console.log('?SDASDAS', res);
      const banner = res.Banners;
      setBanner(banner);
      const services = res.services;
      setRecentBookings(services);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  console.log(banner, 'nammere');

  return (
    <div>
      <UserHeader />

      <div className="swiper-container" style={{ height: '80vh' }}>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          style={{ height: '100%' }}
        >
          {banner?.image?.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="swiper-image"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="elementor-section flex items-center justify-center p-5">
        <div className="elementor-container">
          <div
            className="elementor-element elementor-widget elementor-widget-heading text-center"
            data-id="827fedc"
            data-element_type="widget"
            data-widget_type="heading.default"
          >
            <div className="elementor-widget-container">
              <h6 className="elementor-heading-title text-red-500 items-center elementor-size-default">
                Our Services
              </h6>
            </div>
          </div>
          <div
            className="elementor-element elementor-widget elementor-widget-heading text-center"
            data-id="85e242f"
            data-element_type="widget"
            data-widget_type="heading.default"
          >
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">
                Corporate Event Management
              </h2>
            </div>
          </div>
          <div
            className="elementor-element elementor-widget elementor-widget-text-editor text-center"
            data-id="3101977"
            data-element_type="widget"
            data-widget_type="text-editor.default"
          >
            <div className="elementor-widget-container">
              <p>
                Orci, gravida at dolor penatibus praesent. Id ac nunc nunc
                elementum vitae nunc cursus. Nunc cras facilisis fermentum
                elementum, suspendisse augue dolor.
              </p>
            </div>
          </div>
          <div
            className="elementor-element elementor-widget elementor-widget-button text-center"
            data-id="6abc22d"
            data-element_type="widget"
            data-widget_type="button.default"
          >
            <div className="elementor-widget-container">
              <div className="elementor-button-wrapper">
                <a
                  className="elementor-button elementor-button-link elementor-size-sm bg-red-500 "
                  href="/services"
                >
                  <span className="elementor-button-content-wrapper">
                    <button className="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      View All Services
                    </button>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="elementor-section flex items-center justify-center p-5">
        {/* Other content here */}
        <div className="flex flex-wrap justify-center">
          {recentBookings.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserHomeScreen;
