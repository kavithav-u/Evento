import { Outlet } from 'react-router-dom';
import UserHomeScreen from './Screens/user/UserHomeScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
    <ToastContainer />
    <Outlet />
    </>
  )
}

export default App