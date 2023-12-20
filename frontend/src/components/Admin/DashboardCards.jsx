import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaCalendarCheck, FaBusinessTime, FaUser } from "react-icons/fa";
import { useAdminDashboardMutation } from '../../Slices/adminApiSlice';


const DashboardCards = () => {
  const [ sales,setSales] = useState([]);
  const [users, setUsers] = useState('');
  const [dashboardAPI] = useAdminDashboardMutation();
  const [booking,setBooking] = useState('');

  useEffect(() => {
    fetchDashboard();
  },[]);

  const fetchDashboard = async () => {

      try {
        const res = await dashboardAPI().unwrap();
        console.log("eventSalws",res,"resss");
        const totalSales = res.TotalSales || [];
        const totalUsers = res.TotalUsers;
        const booking = res.booking;
        setUsers(totalUsers);
        setSales(totalSales);
        setBooking(booking);

      } catch (err) {
        toast.error(err?.data?.message || err.error)
    }
  };

  console.log("totalSales", sales, "total", users)


  return (
    <div className="flex flex-wrap">
    {/* Sales Component */}
    {sales.map((sale) => (
      <div key={sale.id} className="w-full sm:w-1/2 xl:w-1/3 p-3">
        <div className="bg-white border rounded-lg p-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h3 className="text-lg font-semibold mb-0">Sales</h3>
              <p className="text-success ml-2 mb-0 font-medium">{sale.totalSales}</p>
            </div>
            <div className="flex-grow text-right">
              <div className="bg-success-200 text-success p-2 rounded-full">
                <span className="mdi mdi-arrow-top-right"></span>
              </div>
            </div>
            <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
              <FaBusinessTime className="text-3xl text-black" />
            </div>
          </div>
        </div>
      </div>
    ))}

    {/* Users Component */}
    <div className="w-full sm:w-1/2 xl:w-1/3 p-3">
      <div className="bg-white border rounded-lg p-3">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <h3 className="text-lg font-semibold mb-0">Users</h3>
            <p className="text-success ml-2 mb-0 font-medium">{users}</p>
          </div>
          <div className="flex-grow text-right">
            <div className="bg-success-200 text-success p-2 rounded-full">
              <span className="mdi mdi-arrow-top-right"></span>
            </div>
          </div>
          <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
            <FaUser className="text-3xl text-black" />
          </div>
        </div>
      </div>
    </div>

    {/* Bookings Component */}
    <div className="w-full sm:w-1/2 xl:w-1/3 p-3">
      <div className="bg-white border rounded-lg p-3 flex items-center">
        <div className="flex-shrink-0">
          <h3 className="text-lg font-semibold mb-0">Bookings</h3>
          <p className="text-success ml-2 mb-0 font-medium">{booking}</p>
        </div>
        <div className="flex-grow text-right">
          <div className="bg-success-200 text-success p-2 rounded-full">
            <span className="mdi mdi-arrow-top-right"></span>
          </div>
        </div>
        <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
          <FaCalendarCheck className="text-3xl text-black" />
        </div>
      </div>
    </div>
  </div>

     )
}

export default DashboardCards