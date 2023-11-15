import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTable } from 'react-table';
import {useAdminGetUserMutation, useAdminActionUserMutation} from '../../Slices/adminApiSlice';
import {toast} from 'react-toastify';



function AdminUserList () {

    const [userData, setUserData] = useState("");
    const [getUserData ] = useAdminGetUserMutation();
    const [userAction] = useAdminActionUserMutation();

    useEffect (()=> {
        submitHandler();
    },[]);


    const submitHandler = async (e) => {
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
        const res = await userAction({userId}).unwrap();
        if(res.success) {
          setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user._id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }


  return (
    <div>
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <strong className="text-gray-700 font-medium">User List</strong>
        <div className="border-x border-gray-200 rounded-sm mt-3">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Email Address</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {userData && userData.length > 0 ? (
                userData.map((user) => (
                  <tr key={user?._id}>
                    <td>{user?._id}</td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>
                      {user?.image ? (
                        <img
                          src={user?.image}
                          alt={`Image of ${user?.name}`}
                          className="w-12 h-12"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>
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
                  <td colSpan="3">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default AdminUserList;
