import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {FcBullish} from 'react-icons/fc';
import {DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS} from '../../lib/constants';
import { HiOutlineLogout } from 'react-icons/hi';
import classNames from 'classnames';
import { useAdminlogoutMutation } from '../../Slices/adminApiSlice';
import { adminLogout } from '../../Slices/adminAuthSlice';


const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [logoutApiCall] = useAdminlogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(adminLogout());
            navigate('/admin');
          } catch (err) {
            toast.error(err?.data?.message || err.error)
          }
      }

  return (
<div className="bg-neutral-900 w-60 h-screen p-3 flex flex-col overflow-hidden">
			<div className="flex items-center gap-2 px-1 py-3">
				<FcBullish fontSize={24} />
				<span className="text-neutral-200 text-lg">Admin</span>
			</div>
			<div className="py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
			</div>
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
				{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				<div className={classNames(linkClass, 'cursor-pointer text-red-500')} onClick={ logoutHandler}>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					Logout
				</div>
			</div>
		</div>
  )
}

export default Sidebar;


function SidebarLink({ link }) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	)
}