import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import {toast} from 'react-toastify';
import { setCredentials } from "../../Slices/authSlice";
import Loader from "../../components/user/Loader";
import { useRegisterMutation } from "../../Slices/usersApiSlice";
import OAuth from "../../components/user/OAuth";



const UserRegisterScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if(userInfo) {
    //       navigate('/')
    //     }
    //   },[navigate, userInfo])

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
        if(password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try{
                const res= await register({name, email, password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(`/Otp?name=${name}&email=${email}&password=${password}`);
            } catch(err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={submitHandler} >
        <input
          type='text'
          placeholder='Enter Username'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className='border p-3 rounded-lg'
          id='name'

        />
        <input
          type='email'
          placeholder='Enter Email Address'
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          className='border p-3 rounded-lg'
          id='email'

        />
        <input
          type='password'
          placeholder='Enter the password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border p-3 rounded-lg'
          id='password'

        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='border p-3 rounded-lg'
          id='Confirmpassword'

        />
            {isLoading && <Loader />}

        <button 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          Sign Up
        </button>

        <OAuth />

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/login'>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      
      {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
    </div>
  )
}

export default UserRegisterScreen