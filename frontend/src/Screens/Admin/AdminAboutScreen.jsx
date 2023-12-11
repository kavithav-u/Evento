import React from 'react';
import AboutList from '../../components/Admin/AboutList';
import Sidebar from '../../components/Admin/Sidebar';
import AdminHeader from '../../components/Admin/AdminHeader';

const AdminAboutScreen = () => {
  return (
<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <Sidebar />
    <div className="flex flex-col flex-1">
        <AdminHeader />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
            <AboutList />    
        </div>
    </div>
</div>
  )
}

export default AdminAboutScreen