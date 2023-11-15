import React from 'react';

import UserHeader from '../../components/user/userHeader.jsx';
import Footer from '../../components/user/Footer.jsx';
import About from '../../components/user/About.jsx';
import {AboutBanner} from '../../components/user/Banner.jsx'

const AboutScreen = () => {
  return (
          <div>
        <UserHeader />
        <About />
        <Footer />
    </div>
  )
}

export default AboutScreen