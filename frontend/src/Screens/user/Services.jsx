import React , {useEffect} from 'react';
import UserHeader from '../../components/user/userHeader.jsx';
import Events from '../../components/user/Events';
import Footer from '../../components/user/Footer.jsx';
import Features from '../../components/user/Features.jsx';

const Services = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []); // Empty dependency array to ensure it runs only once when the component mounts
  
    // Rest of your component code
  
    return (
      <div>
        <UserHeader />
        <Events />
        <Features />
        <Footer />
    </div>
  )
}

export default Services