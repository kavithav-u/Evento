import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useElasticSearchMutation, useLogoutMutation } from '../../Slices/usersApiSlice';
import { logout } from '../../Slices/authSlice';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { selectSelectedHallId, setSelectedHallId } from '../../Slices/searchSlice';


const UserHeader = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [input, setInput] = useState('');
  const [hallResults, setHallResults] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);
  const [logoutApiCall] = useLogoutMutation();
  const [elasticSearchAPI] = useElasticSearchMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedHallIdFromStore = useSelector(selectSelectedHallId);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    fetchData ()
  },[]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    }catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hallResults.length > 0) {
      const selectedHall = hallResults[0]; 
      setSelectedHall(selectedHall);
    }
  };

  const bannerStyle = {
    top: isDropdownOpen ? '50px' : '0',
  };

  const fetchData = async (value) => {
    try {
      
    const res = await elasticSearchAPI({input:value}).unwrap();
    setHallResults(res.halls)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
};

const suggestionClickHandler = (hallId) => {
  const hallName = hallId.hallName;
  
  dispatch(setSelectedHallId(hallId?._id));

  setInput(hallName);

  setHallResults([]);

  // console.log('Selected Hall ID:', hallId);
};

  

  const handleChange = (value) => {
    setInput(value);

    if (value.trim() !== '') {
      const filteredHalls = hallResults.filter((hall) =>
        hall.hallName.toLowerCase().includes(value.toLowerCase())
      );
      setHallResults(filteredHalls);
    } else {
      setHallResults([]);
      
    }
  };
  // console.log(hallResults,"after emptying")


  return (
    <header className="bg-slate-200 shadow-md relative z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className='no-underline'>
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
            value = {input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <button onClick={() => navigate('/search')}>

            <FaSearch className='text-slate-600' />
          </button>
{input.trim() !== '' && hallResults.length > 0 && (
  <div className="absolute mt-52 bg-white border rounded-lg border-gray-300 w-60 max-h-44 overflow-y-auto z-10">
    <ul>
{hallResults.map((hall) => (
  <li key={hall.id} className="px-4 py-2 cursor-pointer hover:bg-gray-100"
    onClick={() => {
      suggestionClickHandler(hall, hall.id);
      setHallResults([]);
    }}
  >
    {hall.hallName}
  </li>
))}

    </ul>
  </div>
)}

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
    {userInfo.image && userInfo.image.length>0 ? (
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
                <Link to="/profile" className="block py-2 px-4  text-white hover:bg-slate-600 no-underline">
                  Profile
                </Link>
                <Link to="/chat" className="block py-2 px-4  text-white hover:bg-slate-600 no-underline">
                  MyChats
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
      </div>
    </header>
  );
};

export default UserHeader;
