import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  useDeleteBannerMutation,
  useFetchBannerMutation,
  useUpdateBannerMutation,
} from "../../Slices/adminApiSlice";
import Loader from "../user/Loader";

const BannerList = () => {
  const [bannerData, setBannerData] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPage, setEditedPage] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [getBannerData, {isLoading}] = useFetchBannerMutation();
  const [updateBannerData] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();
  useEffect(() => {
    fetchBanner();
  }, [currentPage]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "up0dzyua");
        formData.append("cloud_name", "dszrxbtng");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dszrxbtng/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        imageUrls.push(data.secure_url);
        toast.success("Image uploaded successfully to Cloudinary");
      } catch (err) {
        toast.error("Error uploading image to Cloudinary");
      }
      setEditedImage([...editedImage, ...imageUrls]);
    }
  };

  const fetchBanner = async () => {
    try {
      const res = await getBannerData().unwrap();
      const myBannerData = res.banner;
      setBannerData(myBannerData);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setEditedDescription(banner.description || "");
    setEditedPage(banner.page || "");
    setEditedImage(banner.image || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (banner) => {
    try {
      const bannerId =banner._id;
      console.log(bannerId,"JJJJJJJ")
      const res = await deleteBanner(bannerId).unwrap();
      toast.success(res.message || "Banner deleted successfully");
      await fetchBanner();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSaveBanner = async () => {
    const updatedBanner = {
      _id: selectedBanner._id,
      description: editedDescription,
      page: editedPage,
      image: editedImage,
    };
    try {
      const res = await updateBannerData(updatedBanner).unwrap();
      console.log(res);
      setIsModalOpen(false);
      await fetchBanner();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBanner(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bannerData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(bannerData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div>
      <div className="mb-3">
        <Link
          to="/admin/banner/new"
          className="bg-emerald-700 text-white px-4 py-2 mb-6 rounded-md"
        >
          Add New
        </Link>
      </div>
      <div className="bg-white px-4 pb-4 rounded-sm border border-gray-200 flex-1">
        <strong className="text-gray-700 font-medium">Banner List</strong>
        <div className="border-x border-gray-200 rounded-sm mt-3">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th className="hidden">ID</th>
                <th>Page</th>
                <th>Description</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
            {isLoading ? (
                   <tr>
                   <td colSpan="5">
                     <div className="flex justify-center items-center py-8">
                       <Loader />
                     </div>
                   </td>
                 </tr>
                ) : (
              currentItems && currentItems.length > 0 ? (
                currentItems.map((banner) => (
                  <tr key={banner?._id}>
                    <td>{banner?.page}</td>
                    <td>{banner?.description}</td>
                    <td>
                      {banner?.image && (
                        <img
                        loading="lazy"
                          src={banner?.image}
                          alt={banner?.page}
                          width="50"
                          height="50"
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="text-green-600"
                        onClick={() => handleEdit(banner)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="ml-3 text-red-700"
                        onClick={() => handleDelete(banner)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No Banner found.</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              )
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 px-4 py-2 bg-slate-200 text-black rounded-md"
          >
            <BsChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-2 px-4 py-2 ${
                currentPage === i + 1
                  ? "bg-slate-200 text-black"
                  : "bg-white text-gray-700"
              } rounded-md`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-2 px-4 py-2bg-slate-200 text-black rounded-md"
          >
            <BsChevronRight />
          </button>
        </div>
      )}
      

      {/* Modal for editing */}
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-gray-800 w-full max-w-md p-4 rounded-lg">
            {/* Modal content */}
            <div className="relative">
              {/* Modal header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <h3 className="text-lg font-semibold text-white">
                  Edit Banner
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form>
                <label
                  htmlFor="description"
                  className="block mb-2 mt-2 text-sm font-medium text-white"
                >
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter description"
                />
                <br />
                <label
                  htmlFor="page"
                  className="block mb-2 mt-2 text-sm font-medium text-white"
                >
                  Page:
                </label>
                <input
                  type="text"
                  id="page"
                  value={editedPage}
                  onChange={(e) => setEditedPage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter page"
                />
                <br />
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter image URL"
                  multiple
                />
                <br />

                <div className="mt-4 flex space-x-4">
                  <button
                    type="button"
                    onClick={handleSaveBanner}
                    className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ms-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerList;
