import React from 'react';
import EventList from '../../components/Admin/EventList';
import Sidebar from '../../components/Admin/Sidebar';
import AdminHeader from '../../components/Admin/AdminHeader';

const EventScreen = () => {
  return (
<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <Sidebar />
    <div className="flex flex-col flex-1">
        <AdminHeader />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
            <EventList/>    
        </div>
    </div>
</div>
  )
}

export default EventScreen