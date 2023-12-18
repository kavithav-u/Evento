import React, { useEffect, useState } from "react";
import { useAboutMutation } from "../../Slices/usersApiSlice";
import { toast } from "react-toastify";

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [getAboutData] = useAboutMutation();
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await getAboutData().unwrap();
      const myBanner = res.Banners;
      const myAbout = res.abouts;
      setBanner(myBanner);
      setAboutData(myAbout);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="banner relative">
        <img
          src={banner.image}
          alt="Banner Image"
          className="object-cover h-96 w-full mt-2"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black to-transparent opacity-70"></div> */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">About Us</h1>
          {/* <p className="text-lg md:text-2xl mt-4">Your banner description goes here.</p> */}
        </div>
      </div>
      {aboutData.length > 0 && (
        <section className="bg-classic p-5">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <div className="bg-white">
                <img
                  src={aboutData[0].image}
                  alt="CEO and Founder"
                  className="w-400 h-456"
                />
              </div>
              <div className="text-center flex flex-col justify-center p-5">
                <h2 className="text-2xl font-semibold">{aboutData[0].title}</h2>
                <p className="mt-3">{aboutData[0].description}</p>
                <div className="mt-3">
                  <img
                    src="https://websitedemos.net/event-management-04/wp-content/uploads/sites/638/2020/07/signature.png"
                    alt=""
                    className="w-40 h-50"
                  />
                  <p className="text-xs text-gray-500">Team Evento</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default About;
