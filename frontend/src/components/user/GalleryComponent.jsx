import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useFetchGalleryMutation } from "../../Slices/usersApiSlice";
import { toast } from "react-toastify";

import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import Loader from "./Loader";

const GalleryComponent = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0); // Track the index of the selected image
  const [fetchGalleryImages, { isLoading }] = useFetchGalleryMutation();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetchGalleryImages().unwrap();
      const myGallery = res.gallery;
      setImages(myGallery);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const viewImage = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeZoom = () => {
    setSelectedImage(null);
  };

  const showPreviousImage = () => {
    const newIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setSelectedIndex(newIndex);
  };

  const showNextImage = () => {
    const newIndex = (selectedIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setSelectedIndex(newIndex);
  };

  return (
    <>
      <div className="p-10">
        {isLoading ? (
          <div className="w-full h-56">
            <Loader />
          </div>
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="1rem">
              {images.map((image, i) => (
                <img
                  key={i}
                  src={image.image}
                  style={{ width: "100%", display: "block", cursor: "pointer" }}
                  alt=""
                  onClick={() => viewImage(image, i)}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}

        {selectedImage && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center overflow-hidden">
            <FaChevronLeft
              className="text-white absolute top-2 left-2 cursor-pointer"
              onClick={showPreviousImage}
            />
            <img
              src={selectedImage.image}
              alt=""
              style={{
                maxWidth: "90%",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
            <FaChevronRight
              className="text-white absolute top-2 right-2 cursor-pointer"
              onClick={showNextImage}
            />
            <FaTimes
              className="text-white absolute bottom-2 right-2 cursor-pointer"
              onClick={closeZoom}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryComponent;
