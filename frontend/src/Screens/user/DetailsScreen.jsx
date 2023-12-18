import React from 'react';
import UserHeader from '../../components/user/userHeader.jsx';
import Footer from '../../components/user/Footer.jsx';
import DetailsPage from '../../components/user/DetailsPage.jsx';
import Map from '../../components/user/Map.jsx';


const DetailsScreen = () => {
  return (
    <div>
        <UserHeader />
        <DetailsPage />
        {/* <Map /> */}
        <Footer />
    </div>
  )
}

export default DetailsScreen