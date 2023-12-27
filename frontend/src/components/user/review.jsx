import React, { useState, useEffect } from "react";
import {
  useAccessUserChatMutation,
  useFetchReviewMutation,
} from "../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [fetchReview] = useFetchReviewMutation();
  const [AccessUserChatApi] = useAccessUserChatMutation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [showWarning, setShowWarning] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchReview().unwrap();
        
        const data = res.reviews;
        console.log(res,"res.reviews")

        console.log(data[0].user,"resd")
        const filteredReviews = userInfo
        ? data.filter((review) => review?.user?._id !== userInfo?._id)
        : data;
        console.log("filteredReviews",filteredReviews)
        setReviews(filteredReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    console.log(reviews,"reviews");

    fetchData();
  }, []);

  const handleChatClick = async (userId) => {
    try {
      if (!userInfo) {
        // Redirect to the login page if the user is not logged in
        toast.warning("Please log in to use the chat feature.");
        navigate("/login");

        return;
      } 
      const data = await AccessUserChatApi({ userId }).unwrap();
      navigate("/chat");
      
    } catch (error) {
      console.log("catch");
    }
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto text-center mb-8">
        <span className="elementor-button-content-wrapper">
          <h2 className="inline-block text-lg rounded px-6 pb-2 pt-2.5 font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
            What Our Clients Say
          </h2>
        </span>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {reviews?.map((review, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 px-4 mb-8 flex items-stretch"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg flex items-center">
                {/* Review Image */}
                <div
                  className="elementor-widget-wrap elementor-element-populated"
                  style={{ width: "100px", height: "100px" }}
                >
                  <div className="elementor-element elementor-element-8ec6449 elementor-widget elementor-widget-image h-full">
                    <div className="elementor-widget-container h-full">
                      <img
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={
                          review?.user?.image ||
                          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        }
                        alt={`Review ${index + 1}`}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="elementor-widget-wrap elementor-element-populated mt-4">
                  <div className="elementor-element elementor-element-730c917 elementor-view-default elementor-widget elementor-widget-icon">
                    <div className="elementor-widget-container">
                      <div className="elementor-icon-wrapper">
                        <div className="elementor-icon">
                          <i
                            aria-hidden="true"
                            className="fas fa-quote-left text-3xl text-gray-500"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content and Meta */}
                <div className="p-4 flex-grow">
                  <p className="text-gray-700 flex-grow">{review?.comment}</p>
                  <div className="text-sm text-gray-600 flex items-center">
                    {/* Display user name in the review */}
                    <p className="mr-2">By {review?.user?.name}</p>

                    {/* Chat Button */}
                    <button
                      className="bg-slate-600 text-white px-3 py-1 rounded hover:bg-red-600 ml-auto"
                      onClick={() => handleChatClick(review?.user?._id)}
                    >
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
