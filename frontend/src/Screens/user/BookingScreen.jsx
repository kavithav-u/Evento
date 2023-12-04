import React from 'react';
import UserHeader from '../../components/user/userHeader.jsx';
import Footer from '../../components/user/Footer.jsx';
import BookingList from '../../components/user/BookingList.jsx';


const BookingScreen = () => {
  return (
    <div>
    <UserHeader />
    <BookingList />
    <Footer />
    </div>
  )
}

export default BookingScreen