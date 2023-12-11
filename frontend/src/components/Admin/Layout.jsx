import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Admin/Sidebar';
import AdminHeader from '../../components/Admin/AdminHeader';

export default function Layout() {
	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<Sidebar />
			<div className="flex flex-col flex-1">
				<AdminHeader />
				<div className="flex-1 p-4 min-h-0 overflow-auto">
					cdfsgtfhygjukhijlukyjgtfhgd
				</div>
			</div>
		</div>
	)
}
