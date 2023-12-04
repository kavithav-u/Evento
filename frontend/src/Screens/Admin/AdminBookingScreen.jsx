import React from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import AdminHeader from '../../components/Admin/AdminHeader'
import BookingsLists from '../../components/Admin/BookingsLists'

const AdminBookingScreen = () => {
  return (
<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <Sidebar />
    <div className="flex flex-col flex-1">
        <AdminHeader />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <BookingsLists />
        </div>
    </div>
</div>
  )
}

export default AdminBookingScreen