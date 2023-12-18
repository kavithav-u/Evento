import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useFetchHallsMutation,
  useUpdateHallMutation,
} from "../../Slices/adminApiSlice";
import { toast } from "react-toastify";
import { useAdminActionhallMutation } from "../../Slices/adminApiSlice";
import { FaEdit } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { truncateDescription } from "../user/Banner";
import Loader from "../user/Loader";
const HallList = () => {
  const [hallData, setHallData] = useState([]);
  const [selectedHall, setSelectedHall] = useState("");
  const [editedhallName, setEditedhallName] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCapacity, setEditedCapacity] = useState("");
  const [editedImages, setEditedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [getHallData, {isLoading}] = useFetchHallsMutation();
  const [updateHallData] = useUpdateHallMutation();
  const [toggleHallStatus] = useAdminActionhallMutation();

  useEffect(() => {
    fetchHalls();
  }, [currentPage]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];
    for (const file of files) {
      console.log(files, "ASZDVXCS");
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
      setEditedImages([...editedImages, ...imageUrls]);
    }
  };
  const toggleHall = async (hallId, hallStatus) => {
    try {
      const res = await toggleHallStatus({ hallId, hallStatus });
      if (res.data.success) {
        setHallData((prevHallData) =>
          prevHallData.map((halls) =>
            halls._id === hallId
              ? { ...halls, isActive: !halls.isActive }
              : halls
          )
        );
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleEdit = (hall) => {
    setSelectedHall(hall);
    setEditedhallName(hall.hallName);
    setEditedDescription(hall.description || "");
    setEditedLocation(hall.location || "");
    setEditedCapacity(hall.capacity || "");
    setEditedImages(hall.hallImage);
    setIsModalOpen(true);
  };

  const fetchHalls = async () => {
    try {
      const res = await getHallData().unwrap();
      const hallData = res.halls;
      setHallData(hallData);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSaveHall = async () => {
    const updatedHall = {
      _id: selectedHall._id,
      hallName: editedhallName,
      description: editedDescription,
      location: editedLocation,
      capacity: editedCapacity,
      hallImage: editedImages,
    };
    try {
      const res = await updateHallData(updatedHall).unwrap();
      console.log(res);
      setIsModalOpen(false);
      await fetchHalls();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHall(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hallData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(hallData.length / itemsPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <div>
        <div>
          <Link
            to="/admin/halls/new"
            className="bg-emerald-700 text-white px-4 py-2 mb-6 rounded-md"
          >
            Add New
          </Link>
        </div>

        <div className="bg-white px-4 pt-3 mt-3 pb-4 rounded-sm border border-gray-200 flex-1">
          <strong className="text-gray-700 font-medium">Event List</strong>
          <div className="border-x border-gray-200 rounded-sm mt-3">
            <table className="w-full text-gray-700">
              <thead>
                <tr>
                  <th className="hidden">ID</th>
                  <th>Hall Name</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th>Hall Images</th>
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
                  currentItems.map((hall) => (
                    <tr key={hall?._id}>
                      <td>{hall?.hallName}</td>
                      <td>{truncateDescription(hall?.description, 10)}</td>
                      <td>{hall?.location}</td>
                      <td>{hall?.pricePerDay}</td>
                      <td>{hall?.capacity}</td>
                      <td>
                        {hall?.hallImage && (
                          <img
                            src={hall?.hallImage[0]}
                            alt={hall?.hallName}
                            width="50"
                            height="50"
                          />
                        )}
                      </td>

                      <td>
                        <button
                          className="text-green-600"
                          onClick={() => handleEdit(hall)}
                        >
                          <FaEdit />
                        </button>
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                          <span
                            className={`absolute inset-0 rounded-full ${
                              hall.isActive
                                ? "bg-green-200 opacity-50"
                                : "bg-red-200 opacity-50"
                            }`}
                          ></span>
                          <span
                            onClick={() => toggleHall(hall._id, hall.isActive)}
                            className={`relative ${
                              hall.isActive ? "text-green-900" : "text-red-900"
                            }`}
                          >
                            {hall.isActive ? "Block" : "Activate"}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No Halls found.</td>
                  </tr>
                )
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
                <h3 className="text-lg font-semibold text-white">Edit Halls</h3>
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
                  htmlFor="hallName"
                  className="block mb-2 mt-2 text-sm font-medium text-white"
                >
                  Hall Name:
                </label>
                <input
                  type="text"
                  id="hallName"
                  value={editedhallName}
                  onChange={(e) => setEditedhallName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter hallName"
                />
                <br />
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
                  htmlFor="location"
                  className="block mb-2 mt-2 text-sm font-medium text-white"
                >
                  Location:
                </label>
                <input
                  type="text"
                  id="page"
                  value={editedLocation}
                  onChange={(e) => setEditedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter Location"
                />
                <br />
                <label
                  htmlFor="capacity"
                  className="block mb-2 mt-2 text-sm font-medium text-white"
                >
                  Capacity:
                </label>
                <input
                  type="text"
                  id="page"
                  value={editedCapacity}
                  onChange={(e) => setEditedCapacity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="EnterCapacity"
                />
                <br />
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Image URL:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
                <br />

                <div className="mt-4 flex space-x-4">
                  <button
                    type="button"
                    onClick={handleSaveHall}
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
    </div>
  );
};

export default HallList;
