import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { useLoginMutation } from "../../Slices/usersApiSlice";
import { setCredentials } from "../../Slices/authSlice";
import {toast} from 'react-toastify';
import Loader from "../../components/user/Loader";
import OAuth from "../../components/user/OAuth";



const UserLoginScreen = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector((state) => state.auth);

    useEffect(() => {
      if(userInfo) {
        navigate('/')
      }
    },[navigate, userInfo])
    
    const submitHandler = async(e) => {
        e.preventDefault();
        if(email === "" ) {
          return toast.warn("Email should not be empty");
        }  else if (password.length===0) {
          return toast.warn("Please enter password")
        }else if(password.length < 6 ) {
          return toast.warn("Password needs atleast 6 character");
        } else if (!/[!@#$%^&*]/.test(password)) {
          return toast.warn("Password should contain at least one special character (!@#$%^&*)");
        }
        try {
          const res = await login({email, password}).unwrap()
          dispatch(setCredentials({...res}))
          navigate('/')
        } catch (err) {
          toast.error(err?.data?.message || err.error)
        }
    }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={submitHandler} className='flex flex-col gap-4'>
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
            {isLoading && <Loader/>}

        <button type="submit"  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Sign In 
        </button>

        <OAuth />

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/register'>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
    </div>
  )
}

export default UserLoginScreen