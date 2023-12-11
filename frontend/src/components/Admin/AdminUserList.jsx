import React, { useEffect, useState } from "react";
import {
  useAdminGetUserMutation,
  useAdminActionUserMutation,
} from "../../Slices/adminApiSlice";
import { toast } from "react-toastify";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function AdminUserList() {
  const [userData, setUserData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [getUserData] = useAdminGetUserMutation();
  const [userAction] = useAdminActionUserMutation();

  useEffect(() => {
    submitHandler();
  }, [currentPage]);

  const submitHandler = async () => {
    try {
      const res = await getUserData().unwrap();
      const myData = res.users;
      setUserData(myData);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const toggleBlock = async (userId) => {
    try {
      const res = await userAction({ userId }).unwrap();
      if (res.success) {
        setUserData((prevUserData) =>
          prevUserData.map((user) =>
            user._id === userId ? { ...user, isActive: !user.isActive } : user
          )
        );
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
        <strong className="text-gray-700 font-medium block sm:inline">
          User List
        </strong>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-700 table-auto">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">User Name</th>
                <th className="py-2">Email Address</th>
                <th className="py-2">Image</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <tr key={user?._id}>
                    <td className="py-2">{user?._id}</td>
                    <td className="py-2">{user?.name}</td>
                    <td className="py-2">{user?.email}</td>
                    <td className="py-2">
                      {user?.image ? (
                        <img
                          src={user?.image}
                          alt={`Image of ${user?.name}`}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className="py-2">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                        <span
                          className={`absolute inset-0 rounded-full ${
                            user.isActive
                              ? "bg-green-200 opacity-50"
                              : "bg-red-200 opacity-50"
                          }`}
                        ></span>
                        <span
                          onClick={() => toggleBlock(user._id)}
                          className={`relative ${
                            user.isActive ? "text-green-900" : "text-red-900"
                          }`}
                        >
                          {user.isActive ? "Block" : "Unblock"}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
}

export default AdminUserList;
