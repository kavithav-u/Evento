import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,
RouterProvider } from 'react-router-dom';
import store from './Store.js';
import App from './App.jsx'
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHomeScreen from './Screens/user/UserHomeScreen.jsx';
import UserLoginScreen from './Screens/user/UserLoginScreen.jsx';
import UserRegisterScreen from './Screens/user/UserRegisterScreen.jsx';
import UserProfileScreen from './Screens/user/UserProfileScreen.jsx';
import PrivateRoute from './components/user/PrivateRoute.jsx';
import AdminLogin from './Screens/Admin/AdminLogin.jsx';
import UsersList from './Screens/Admin/UsersList.jsx';
import AdminPrivateRoute from './components/Admin/AdminPrivateRoute.jsx';
import Services from './Screens/user/Services.jsx';
import EventScreen from './Screens/Admin/EventScreen.jsx';
import CreateEventScreen from './Screens/Admin/CreateEventScreen.jsx';
import HallScreen from './Screens/Admin/HallScreen.jsx';
import CreateHallScreen from './Screens/Admin/CreateHallScreen.jsx';
import CateringScreen from './Screens/Admin/CateringScreen.jsx';
import CreateCateringScreen from './Screens/Admin/CreateCateringScreen.jsx';
import UserListing from './Screens/user/UserListing.jsx'
import DetailsScreen from './Screens/user/DetailsScreen.jsx';
import AboutScreen from './Screens/user/AboutScreen.jsx';
import BannerScreen from './Screens/Admin/BannerScreen.jsx';
import CreateBannerScreen from './Screens/Admin/CreateBannerScreen.jsx';
import AdminAboutScreen from './Screens/Admin/AdminAboutScreen.jsx';
import CreateAboutScreen from './Screens/Admin/CreateAboutScreen.jsx';
import Otp from './components/user/Otp.jsx';
import BookingScreen from './Screens/user/BookingScreen.jsx';
import GalleryScreen from './Screens/Admin/GalleryScreen.jsx';
import CreateGallery from './Screens/Admin/CreateNewGallery.jsx';
import Gallery from './Screens/user/Gallery.jsx';
import SearchListing from './Screens/user/SearchListing.jsx';
import AdminBookingScreen from './Screens/Admin/AdminBookingScreen.jsx';
import DashboardScreen from './Screens/Admin/DashboardScreen.jsx';
import ChatScreen from './Screens/user/chatScreen.jsx';
import ChatAdmin from './Screens/Admin/ChatAdmin.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <UserHomeScreen />,
      },
      {
        path:"/register",
        element:<UserRegisterScreen/>
      },
      {
        path:"otp",
        element:<Otp/>
      },
      {
        path:"login",
        element:<UserLoginScreen/>
      },
      {
        path:"services",
        element:<Services />
      },
      {
        path:"gallery",
        element:<Gallery />
      },
      {
        path:"/listing/:eventId",
        element:< UserListing />
      },
      {
        path:"/details/:hallId",
        element:< DetailsScreen />
      },
      {
        path:"/details/:cateringId",
        element:< DetailsScreen />
      },
      {
        path:"about",
        element:<AboutScreen />
      },
      {
        path:"search",
        element:<SearchListing />
      },
      {
        path: 'profile',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <UserProfileScreen />,
          },
        ],
      },      
      {
        path: 'bookings',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <BookingScreen />,
          },
        ],
      },
      {
        path: 'chat',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <ChatScreen />,
          },
        ],
      }, 
    ],
  },
  {
    path:"/admin", 
    element: <App />,
   
    // eslint-disable-next-line no-sparse-arrays
    children:[
      {
    path:"",
    element:<AdminLogin/>
  },
  {
    path: 'dashboard',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <DashboardScreen />,
      },
    ],
  },,
  {
    path: 'userlist',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <UsersList />,
      },
    ],
  },,
  {
    path: 'events',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <EventScreen />,
      }
    ],
  },,
  {
    path: 'events/new',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <CreateEventScreen />,
      },
    ],
  },,
  {
    path: 'halls',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <HallScreen />,
      },
    ],
  },,
  {
    path: 'halls/new',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <CreateHallScreen />,
      },
    ],
  },,
  {
    path: 'caterings',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <CateringScreen />,
      },
    ],
  },,
  {
    path: 'caterings/new',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <CreateCateringScreen />,
      },
    ],
  },,
  {
    path: 'banner',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <BannerScreen />,
      },
    ],
  },,
  {
    path: 'banner/new',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <CreateBannerScreen />,
      },
    ],
  },,
  {
    path: 'about',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <AdminAboutScreen />
      },
    ],
  },,
  {
    path: 'about/new',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <CreateAboutScreen />,
      },
    ],
  },,
  {
    path: 'gallery',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <GalleryScreen />,
      },
    ],
  },,
  {
    path: 'gallery/new',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <CreateGallery />,
      },
    ],
  },,
  {
    path: 'bookings',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <AdminBookingScreen />,
      },
    ],
  },,
  {
    path: 'bookings/new',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <CreateCateringScreen />,
      },
    ],
  },,
  {
    path: 'chats',
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: <ChatAdmin />,
      },
    ],
  },,
]}
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <React.StrictMode>
      <RouterProvider router={ router} />
    </React.StrictMode>,
  </Provider>
)
