import React from 'react';
import UserHeader from '../../components/user/userHeader.jsx';
import Footer from '../../components/user/Footer.jsx';
import Listing from '../../components/user/Listing.jsx';


const UserListing = () => {
  return (
    <div>
        <UserHeader />
        <Listing />

        <Footer />
    </div>
  )
}

export default UserListing