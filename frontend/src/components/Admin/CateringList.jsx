import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import { useFetchCateringMutation } from '../../Slices/adminApiSlice';
import { toast } from 'react-toastify';
import { useAdminActionCateringMutation } from '../../Slices/adminApiSlice';

const CateringList = () => {
    const [cateringData, setCateringData] = useState([]);
    const [getCateringData] = useFetchCateringMutation();
    const [toggleCateringStatus] = useAdminActionCateringMutation();  

    useEffect(() => {
        fetchCatering();
    },[]);

    const fetchCatering = async () => {
        try {
            const res = await getCateringData().unwrap();
            const cateringData = res.Caterings;
            setCateringData(cateringData)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    const handleToggleStatus = async (cateringId, currentStatus) => {
        try {
          const res = await toggleCateringStatus({ cateringId, currentStatus }).unwrap(); 
          if(res.success) {
            setCateringData((prevCateringData) =>
            prevCateringData.map((catering) =>
              catering._id === cateringId ? { ...catering, isActive: !catering.isActive } : catering
            )
          );
          }
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };

  return (
    <div>
    <Link to="/admin/caterings/new" className="bg-blue-500 text-white px-4 py-2 rounded-md">
Add New
</Link>
<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
<strong className="text-gray-700 font-medium">Event List</strong>
<div className="border-x border-gray-200 rounded-sm mt-3">
<table className="w-full text-gray-700">
  <thead>
    <tr>
      <th className='hidden'>ID</th>
      <th>Food Name</th>
      <th>Description</th>
      <th>Type </th>
      <th>Price</th>
      <th>Images</th>
      <th>Action</th>

    </tr>
  </thead>
  <tbody className="space-y-2">
    {cateringData && cateringData.length > 0 ? (
      cateringData.map((data) => (
        <tr key={data?._id}>
          <td>{data?.itemName}</td>
          <td>{data?.description}</td>
          <td>{data?.isVeg ? 'Veg' : 'Non Veg'}</td>
          <td>{data?.price}</td>
          <td>
              {data?.itemImages && (
                <img
                  src={data?.itemImages[0]}
                  alt={data?.itemName}
                  width="50" 
                  height="50" 
                />
              )}
            </td>
            <td>
                      <button className='text-red-700'
                        onClick={() => handleToggleStatus(data?._id, data?.isActive)}
                      >
                        {data?.isActive ? 'Block' : 'Activate'}
                      </button>
                    </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3">No Caterings found.</td>
      </tr>
    )}
  </tbody>
</table>
</div>
</div>
</div>
  )
}

export default CateringList