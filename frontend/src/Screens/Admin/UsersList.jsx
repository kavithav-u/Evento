import React from 'react';
import Layout from '../../components/Admin/Layout';
import AdminUserList from '../../components/Admin/AdminUserList';
import Sidebar from '../../components/Admin/Sidebar';
import AdminHeader from '../../components/Admin/AdminHeader';

const UsersList = () => {
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <Sidebar />
    <div className="flex flex-col flex-1">
        <AdminHeader />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
            <AdminUserList/>    
        </div>
    </div>
</div>
  )
}

export default UsersList