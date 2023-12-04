import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../Slices/usersApiSlice';
import { logout } from '../../Slices/authSlice';
import { FaSearch } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";

const UserHeader = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logoutApiCall] = useLogoutMutation();
  const [searchTerm,setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const _id = userInfo._id;
  // console.log("_id,",_id)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams",urlParams)
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const bannerStyle = {
    top: isDropdownOpen ? '50px' : '0', // Adjust the top position when the dropdown is open
  };

  return (
    <header className="bg-slate-200 shadow-md relative z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Evento</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>

            <FaSearch className='text-slate-600' />
 
          </button>
        </form>
        <ul className="flex gap-3">
          <Link to="/" className="no-underline text-slate-700 hover:underline">
            <li className="hidden sm:inline ">Home</li>
          </Link>
          <Link to="/about" className="no-underline text-slate-700 hover:underline">
            <li className="hidden sm:inline">About Us</li>
          </Link>
          <Link to="/gallery" className="no-underline text-slate-700 hover:underline">
            <li className="hidden sm:inline">Gallery</li>
          </Link>
          <Link to="/services" className="no-underline text-slate-700 hover:underline">
            <li className="hidden sm:inline">Services</li>
          </Link>

          <li className="relative group">
          {userInfo ? (
  <span
    className="text-slate-700 hover:underline cursor-pointer"
    onClick={toggleDropdown}
  >
    {userInfo.image ? (
      <img
        src={userInfo.image}
        alt={`Avatar of ${userInfo.name}`}
        className="w-8 h-8 rounded-full inline-block mr-2"
      />
    ) : (
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        alt="Default Avatar"
        className="w-8 h-8 rounded-full inline-block mr-2"
      />
    )}
  </span>
) : (
  <Link to="/login" className="text-slate-700 hover:underline">
    Sign In
  </Link>
)}

            {isDropdownOpen && userInfo && (
              <div className="absolute bg-black mt-2 p-2 rounded-lg shadow-lg">
                <Link to="/profile" className="block py-2 px-4  text-white hover:bg-slate-600 ">
                  Profile
                </Link>
                <div
                  className="block py-2 px-4 cursor-pointer  text-white hover:bg-slate-600"
                  onClick={logoutHandler}
                >
                  Logout
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="relative" style={bannerStyle}>
        {/* Your banner image code goes here */}
      </div>
    </header>
  );
};

export default UserHeader;
