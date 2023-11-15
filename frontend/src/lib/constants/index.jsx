import {
	HiOutlineViewGrid,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
} from 'react-icons/hi';
import { PiBeerSteinBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";


export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin/dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'userlist',
		label: 'Userlist',
		path: '/admin/userlist',
		icon: <FaUsers />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/orders',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'events',
		label: 'Events',
		path: '/admin/events',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'halls',
		label: 'Halls',
		path: '/admin/halls',
		icon: <HiOutlineUsers />
	},
	{
		key: 'caterings',
		label: 'Caterings',
		path: '/admin/caterings',
		icon: <PiBeerSteinBold />
	},
	{
		key: 'banner',
		label: 'Banners',
		path: '/admin/banner',
		icon: <PiBeerSteinBold />
	},
	{
		key: 'about',
		label: 'About',
		path: '/admin/about',
		icon: <PiBeerSteinBold />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]