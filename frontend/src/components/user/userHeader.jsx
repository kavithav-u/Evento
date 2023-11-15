import React from 'react'
import { Navbar, Nav, Container,NavDropdown, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {FaSearch} from 'react-icons/fa';
import { useLogoutMutation } from '../../Slices/usersApiSlice';
import { logout } from '../../Slices/authSlice';



const userHeader = () => {
    const {userInfo} = useSelector((state) =>state.auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [logoutApiCall] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logoutHandler = async () => {
    try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
  }
  return (
    <header className="bg-slate-200 shadow-md">
    <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
      <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Evento</span>
        </h1>
      </Link>

      <form className="bg-slate-100 p-3 rounded-lg flex items-center">
        {/* Your search input and button go here */}
      </form>

      <ul className="flex gap-3">
        <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
        </Link>
        <Link to="/about">
          <li className="hidden sm:inline text-slate-700 hover:underline">About Us</li>
        </Link>
        <Link to="/gallery">
          <li className="hidden sm:inline text-slate-700 hover:underline">Gallery</li>
        </Link>
        <Link to="/services">
          <li className="hidden sm:inline text-slate-700 hover:underline">Services</li>
        </Link>

        <li className="relative group">
          {userInfo ? (
            <span
              className="text-slate-700 hover:underline cursor-pointer"
              onClick={toggleDropdown}
            >
              {userInfo.image && (
                <img
                  src={userInfo.image}
                  alt={`Avatar of ${userInfo.name}`}
                  className="w-8 h-8 rounded-full inline-block mr-2"
                />
              )}
              {userInfo.image ? null : userInfo.name}
            </span>
          ) : (
            <Link to="/login" className="text-slate-700 hover:underline">
              Sign In
            </Link>
          )}
          {isDropdownOpen && userInfo && (
            <div className="absolute bg-slate-500 text-slate-700 mt-2 p-2 rounded-lg shadow-lg">
              <Link to="/profile" className="block py-2 px-4 hover:bg-slate-600">
                Profile
              </Link>
              <div
                className="block py-2 px-4 cursor-pointer hover:bg-slate-600"
                onClick={logoutHandler}
              >
                Logout
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  </header>
  )
}

export default userHeader