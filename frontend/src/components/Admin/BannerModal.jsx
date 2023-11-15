import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetchBannerMutation, useUpdateBannerMutation } from '../../Slices/adminApiSlice';
import BannerModal from './BannerModal'; // Import the BannerModal component

const BannerList = () => {
  const [bannerData, setBannerData] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [getBannerData] = useFetchBannerMutation();
  const [updateBanner] = useUpdateBannerMutation(); // Add the updateBanner mutation

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await getBannerData().unwrap();
      console.log(res, "DCSD");
      const myBannerData = res.banner;
      setBannerData(myBannerData);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setIsModalOpen(true);
  };

  const handleSaveBanner = async (editedBanner) => {
    try {
      await updateBanner({ bannerId: selectedBanner._id, updatedBanner: editedBanner }).unwrap();
      // Reload the banner data after updating
      fetchBanner();
      toast.success('Banner updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBanner(null);
  };

  return (
    <div>
      {/* ... Your existing code ... */}

      {bannerData.map((banner) => (
        <tr key={banner?._id}>
          {/* ... Other columns ... */}
          <td>
            <button onClick={() => handleEdit(banner)}>Edit</button>
            {/* Add a delete button if needed */}
          </td>
        </tr>
      ))}

      {/* Render the BannerModal */}
      <BannerModal
        banner={selectedBanner}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveBanner}
      />
    </div>
  );
};

export default BannerList;
