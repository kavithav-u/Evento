
import React,{ useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import {toast} from 'react-toastify';
import { setCredentials } from "../../Slices/authSlice";
import { MdModeEditOutline } from "react-icons/md";
import { useUpdateProfileMutation, useFetchProfileMutation, useUpdatePasswordMutation } from '../../Slices/usersApiSlice';
import { logout } from '../../Slices/authSlice';
import { useLogoutMutation } from '../../Slices/usersApiSlice';
import Axios from 'axios';
import UserHeader from '../../components/user/userHeader';

const UserProfileScreen = () => {
    const [image,setImage]=useState()
    const [name,setName] = useState('');
    const [number,setNumber] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ imageSelected, setImageSelected ] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.auth);
    const [updateProfile, {isLoading}] = useUpdateProfileMutation();
    const [passwordUpdate] = useUpdatePasswordMutation();
    const [logoutApiCall] = useLogoutMutation();
    const [fetchProfile] = useFetchProfileMutation();

    useEffect (() => {
      profile();
    },[]);

    const profile = async () => {
      try {
        const res = await fetchProfile().unwrap();
        console.log("res.",res)
        if(res.notActive) {
          dispatch(logout());
          toast.warning('User is blocked. Please log in again.');
        }

      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

    const handleUserBookings = async(e) => {
      try {
        navigate('/bookings')
      } catch (err) {
          console.error(err);
      }
      }

    useEffect(() => {
        setName(userInfo.name),
        setEmail (userInfo.email),
        setNumber(userInfo.number),
        setImage(userInfo.image)
      },[userInfo.setEmail, userInfo.setName, userInfo.setImage, userInfo.image]);

      const submitHandler = async(e) => {
        e.preventDefault();
            try {
                const res = await updateProfile({
                  _id: userInfo._id,
                  name,
                  email,
                  image,
                  number,
                }).unwrap();
                
                dispatch(setCredentials({ ...res }));
                toast.success('Profile updated successfully');
                setIsModalOpen(false);
                await profile();
              } catch (err) {
                toast.error(err?.data?.message || err.error);
              }
    };

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      console.log(file,"ASZDVXCS")
      if(file) {
          try {
              const formData = new FormData();
              formData.append('file', file);
              formData.append('upload_preset', 'up0dzyua');
              formData.append('cloud_name', 'dszrxbtng');
              const response = await fetch('https://api.cloudinary.com/v1_1/dszrxbtng/image/upload', {
                method: 'POST',
                body: formData,
              });
              const data = await response.json();
              setImage(data.secure_url);
              toast.success('Image uploaded successfully to Cloudinary');
          } catch (err) {
              toast.error('Error uploading image to Cloudinary');
          }
      }
    }
        
    const handleEdit = () => {

      setName(userInfo?.name || '');
      setNumber(userInfo?.number || '');
      setEmail(userInfo?.email || '');
      setImage(userInfo?.image || '')
      setIsModalOpen(true);
    };

   const handleEditPassword =() => {
    setPassword(userInfo.password || '');
    setIsPasswordModalOpen(true)
   }
   console.log(password,"dfdfdfd")

   const handlePasswordUpdate = async () => {
    console.log("RFRFRFRFRF")
    try {
      const res = await passwordUpdate({
          _id: userInfo._id,
          password,
          
      }).unwrap();
      console.log(res,"RESD")
    } catch (error) {
      toast.error(err?.data?.message || err.error);
    }

    closePasswordModal();
  };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const closePasswordModal = () => {
      setIsPasswordModalOpen(false);
    };
  return (
    <>
    <UserHeader />
    <div className="container mx-auto mt-5">
    <h2 className="text-center text-3xl font-semibold">My Profile</h2>
      <div className="flex flex-col lg:flex-row justify-around mt-5">
        <div className="flex flex-col items-center">
          <figure className="avatar avatar-profile">
            <img
              className="rounded-full w-72 h-72 object-cover"
              src={userInfo?.image || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}
              alt=""
            />
          </figure>
          <button
            type="button"
            className="bg-sky-950 text-white p-3 rounded-lg uppercase hover:opacity-95 mt-3"
            onClick={() => handleEdit()}
          >
            Edit Profile
          </button>
        </div>
  
        <div className="flex flex-col mt-5 lg:mt-0">
          <div className="mb-3 lg:flex">
            <div className="w-full lg:w-1/2 pr-0 lg:pr-2 mb-2 lg:mb-0">
              <h4 className="text-xl font-semibold">Full Name
              </h4>
              <p>{userInfo?.name}</p>
            </div>
            <div className="w-full lg:w-1/2 pl-0 lg:pl-2">
              <h4 className="text-xl font-semibold">Email Address</h4>
              <p>{userInfo?.email}</p>
            </div>
          </div>
  
          <div className="mb-3">
            <h4 className="text-xl font-semibold">Phone Number</h4>
            <p>{userInfo?.number || 0}</p>
          </div>
  
          <div className="flex space-x-3">
          <button className="btn btn-primary "
          onClick={() => handleEditPassword()}>
            Change Password
          </button>
   {/* Password Modal */}
   {isPasswordModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white w-full max-w-md p-4 rounded-md">
            <div className="flex items-center justify-between pb-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Change Password
              </h3>
              <button
                type="button"
                onClick={closePasswordModal}
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

            {/* Password update form */}
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter new password"
            />
            <br />

            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Confirm new password"
            />
            <br />

            <button
              type="button"
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
              onClick={handlePasswordUpdate}
            >
              Update Password
            </button>
          </div>
        </div>
      )}
          <button className="btn btn-danger"
          onClick={handleUserBookings}>
            My Bookings
          </button>
          </div>
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
                  Edit Profile
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter description"
                />
                <br />
                <label
                  htmlFor="page"
                  className="block mb-2 mt-2 text-sm font-medium text-white"
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="page"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter Number"
                />
                <br />
                <label
                  htmlFor="page"
                  className="block mb-2 mt-2 text-sm font-medium text-white"
                >
                  Email:
                </label>
                <input
                  type="text"
                  id="page"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter Email"
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
                     onClick={submitHandler}
                    className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Update
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
  </>
  
  )
}

export default UserProfileScreen