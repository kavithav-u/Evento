import React from 'react';
import {
	HiOutlineViewGridAdd,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
} from 'react-icons/hi';
import { FaUsers } from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import { BsInputCursorText } from "react-icons/bs";
import { IoChatboxOutline } from "react-icons/io5";
import { RiFileImageFill } from "react-icons/ri";
import { MdEvent } from "react-icons/md";
import { GiIndianPalace } from "react-icons/gi";
import { VscGraph } from "react-icons/vsc";



export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin/dashboard',
		icon: <VscGraph />
	},
	{
		key: 'userlist',
		label: 'Userlist',
		path: '/admin/userlist',
		icon: <FaUsers />
	},
	{
		key: 'events',
		label: 'Events',
		path: '/admin/events',
		icon: <MdEvent />
	},
	{
		key: 'halls',
		label: 'Halls',
		path: '/admin/halls',
		icon: <GiIndianPalace />
	},
	{
		key: 'banner',
		label: 'Banners',
		path: '/admin/banner',
		icon: <RiFileImageFill />
	},
	{
		key: 'about',
		label: 'About',
		path: '/admin/about',
		icon: <BsInputCursorText />
	},
		{
		key: 'gallery',
		label: 'Gallery',
		path: '/admin/gallery',
		icon: <HiOutlineViewGridAdd />
	},
		{
		key: 'bookings',
		label: 'Bookings',
		path: '/admin/bookings',
		icon: <IoMdBookmarks />
	},
	// {
	// 	key: 'chats',
	// 	label: 'Chats',
	// 	path: '/admin/chats',
	// 	icon: <IoChatboxOutline />
	// },
	
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