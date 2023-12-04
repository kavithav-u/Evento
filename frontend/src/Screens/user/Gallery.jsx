import React from 'react';
import UserHeader from '../../components/user/userHeader.jsx';
import Footer from '../../components/user/Footer.jsx';
import GalleryComponent from '../../components/user/GalleryComponent.jsx';

const Gallery = () => {
  return (
    <div>
        <UserHeader />
        <GalleryComponent />
        <Footer />
    </div>
  )
}

export default Gallery