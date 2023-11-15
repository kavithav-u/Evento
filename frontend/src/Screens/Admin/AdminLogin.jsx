import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setAdminCredentials} from '../../Slices/adminAuthSlice';
import { useAdminloginMutation } from "../../Slices/adminApiSlice";
import {toast} from 'react-toastify';

const AdminLogin = () => {

  const [email,setEmail] = useState('');
  const [ password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adminlogin] = useAdminloginMutation();
  
  const {adminInfo} = useSelector((state) => state.adminAuth);


  useEffect(() => {
    if(adminInfo) {
      navigate('/admin/dashboard')
    }
  },[navigate,adminInfo]);

  console.log(adminInfo,"ADMIN")
  const submitHandler = async (e) => {
    e.preventDefault();
    try{
  
      const res = await adminlogin({email, password}).unwrap()
      console.log("res", res)
      dispatch(setAdminCredentials({...res}))
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
    <form 
    onSubmit={submitHandler} 
    className='flex flex-col gap-4'>
      <input
        type='email'
        placeholder='Enter email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border p-3 rounded-lg'
        id='email'

      />
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='border p-3 rounded-lg'
        id='password'

      />
          {/* {isLoading && <Loader/>} */}

      <button type="submit"  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        Sign In 
      </button>

    </form>

    {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
  </div>
)
}

export default AdminLogin