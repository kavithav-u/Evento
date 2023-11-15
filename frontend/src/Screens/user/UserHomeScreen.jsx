import React from 'react'
import UserHeader from '../../components/user/userHeader.jsx';
import Footer from '../../components/user/Footer.jsx';

const UserHomeScreen = () => {
  return (
    <div>
        <UserHeader />
            <img
        src="https://images.unsplash.com/photo-1608399961935-ef46b05f3e20?auto=format&fit=crop&q=80&w=1785&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Description of your image"
        className="w-full"
      />
      <Footer />
    </div>
  )
}

export default UserHomeScreen;