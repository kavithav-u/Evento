import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useUpdateAboutMutation,
  useFetchAboutMutation,
  useDeleteAboutMutation,
} from "../../Slices/adminApiSlice";

const AboutList = () => {
  const [aboutData, setAboutData] = useState([]);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAboutData] = useFetchAboutMutation();
  const [updateAboutData] = useUpdateAboutMutation();
  const [deleteAbout] = useDeleteAboutMutation();

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleEdit = (about) => {
    setSelectedAbout(about);
    setEditedDescription(about.description || "");
    setEditedImage(about.image || "");
    setEditedTitle(about.title || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (aboutId) => {
    try {
      console.log(aboutId, "FFF");
      const res = await deleteAbout(aboutId).unwrap();
      toast.success(res.message || "Banner deleted successfully");
      await fetchAbout();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file, "ASZDVXCS");
    if (file) {
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
        setEditedImage(data.secure_url);
        toast.success("Image uploaded successfully to Cloudinary");
      } catch (err) {
        toast.error("Error uploading image to Cloudinary");
      }
    }
  };
  const handleSaveAbout = async (editedAbout) => {
    const updatedAbout = {
      _id: selectedAbout._id,
      description: editedDescription,
      title: editedTitle,
      image: editedImage,
    };
    console.log("save About", updatedAbout);
    try {
      const res = await updateAboutData(updatedAbout).unwrap();
      console.log(res, "RES");
      setIsModalOpen(false);
      await fetchAbout();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBanner(null);
  };

  const fetchAbout = async () => {
    try {
      const res = await getAboutData().unwrap();
      const myAboutData = res.about;
      setAboutData(myAboutData);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const truncateText = (text, maxCharacters) => {
    if (text.length > maxCharacters) {
      const truncated = text.slice(0, maxCharacters);
      return `${truncated}...`;
    }
    return text;
  };
  return (
    <div>
      <div>
        <Link
          to="/admin/about/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add New
        </Link>
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
          <strong className="text-gray-700 font-medium">About List</strong>
          <div className="border-x border-gray-200 rounded-sm mt-3">
            <table className="w-full text-gray-700">
              <thead>
                <tr>
                  <th className="hidden">ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {aboutData && aboutData.length > 0 ? (
                  aboutData.map((about) => (
                    <tr key={about?._id}>
                      <td>{truncateText(about?.title, 15)}</td>
                      <td>{truncateText(about?.description, 10)}</td>
                      <td>
                        {about?.image && (
                          <img
                            src={about?.image}
                            alt={about?.title}
                            width="50"
                            height="50"
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="text-green-600"
                          onClick={() => handleEdit(about)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="ml-3 text-red-700"
                          onClick={() => handleDelete(about)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Nothing found.</td>
                  </tr>
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
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter page"
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
                  onChange={(e) => handleImageUpload(e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
                <br />

                <div className="mt-4 flex space-x-4">
                  <button
                    type="button"
                    onClick={handleSaveAbout}
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

export default AboutList;
