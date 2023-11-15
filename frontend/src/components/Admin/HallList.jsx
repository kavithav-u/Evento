import React, { useEffect, useState } from 'react';
import{ Link}  from 'react-router-dom';
import { useFetchHallsMutation } from '../../Slices/adminApiSlice';
import { toast } from 'react-toastify';
import { useAdminActionhallMutation } from '../../Slices/adminApiSlice';

const HallList = () => {

  const [hallData, setHallData] = useState([]);
  const [getHallData] = useFetchHallsMutation();
  const [toggleHallStatus] = useAdminActionhallMutation();

  useEffect(() => {
    fetchHalls();
  },[]);


  const toggleHall = async (hallId, hallStatus) => {
    try {
      const res = await toggleHallStatus({hallId, hallStatus});
      if(res.data.success) {
        setHallData((prevHallData) => 
        prevHallData.map((halls) => 
            halls._id===hallId ? {...halls, isActive: !halls.isActive} : halls
          )
        )
      } 
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const truncateDescription = (description, maxCharacters) => {
    if (description.length > maxCharacters) {
      const truncated = description.slice(0, maxCharacters);
      return `${truncated}...`;
    }
  
    return description;
  };

  const fetchHalls = async () => {
    try {
      const res = await getHallData().unwrap();
      const hallData = res.halls;
      setHallData(hallData);
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
<div>
            <Link to="/admin/halls/new" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Add New
      </Link>
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Event List</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className='hidden'>ID</th>
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
            {hallData && hallData.length > 0 ? (
              hallData.map((hall) => (
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
                          width="50" // Set the width to your desired value
                          height="50" // Set the height to your desired value
                        />
                      )}
                    </td>

                  <td>
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
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default HallList