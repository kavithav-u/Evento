import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  useFetchBannerMutation,
  useUpdateBannerMutation,
} from "../../Slices/adminApiSlice";
import BannerModal from "./BannerModal";

const BannerList = () => {
  const [bannerData, setBannerData] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [getBannerData] = useFetchBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  useEffect(() => {
    fetchBanner();
  }, []);

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
    setIsModalOpen(true);
  };

  const handleSaveBanner = async (editedBanner) => {
    try {
      await updateBanner({
        bannerId: selectedBanner._id,
        updatedBanner: editedBanner,
      }).unwrap();
      fetchBanner();
      toast.success("Banner updated successfully");
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
      {bannerData.map((banner) => (
        <tr key={banner?._id}>
          <td>
            <button onClick={() => handleEdit(banner)}>Edit</button>
          </td>
        </tr>
      ))}

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
