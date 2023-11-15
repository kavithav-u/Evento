import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import {toast} from 'react-toastify';
import { setCredentials } from "../../Slices/authSlice";
import Loader from "../../components/user/Loader";
import { useUpdateProfileMutation } from '../../Slices/usersApiSlice';
import { logout } from '../../Slices/authSlice';
import { useLogoutMutation } from '../../Slices/usersApiSlice';
import Axios from 'axios';

const UserProfileScreen = () => {
    const [image,setImage]=useState()
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ imageSelected, setImageSelected ] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.auth);
    const [updateProfile, {isLoading}] = useUpdateProfileMutation();
    const [logoutApiCall] = useLogoutMutation();


    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
          } catch (err) {
            console.error(err);
          }
      }

    useEffect(() => {
        setName(userInfo.name),
        setEmail (userInfo.email),
        setImage(userInfo.image)
      },[userInfo.setEmail, userInfo.setName, userInfo.setImage]);

      const openFileInput = () => {
        // Trigger the click event on the hidden file input
        fileInputRef.current.click();
      };

      const submitHandler = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
          console.log(password,"PASSWORD",confirmPassword,"confirmPassword")
            toast.error('Passwords do not match');
        } else {
            try {
                console.log("qqqqqwww")
                const res = await updateProfile({
                  _id: userInfo._id,
                  name,
                  email,
                  password,
                }).unwrap();
                console.log(res,"RES")
                dispatch(setCredentials({ ...res }));
                console.log(res,"qqqqq")
                toast.success('Profile updated successfully');
              } catch (err) {
                toast.error(err?.data?.message || err.error);
              }
        }
    };

        const uploadImage = async () => {
            if (!imageSelected) {
                toast.error('Please select an image before uploading.');
                return;
              }

            const data = new FormData();
            data.append('file', imageSelected);
            data.append('upload_preset', 'up0dzyua');
            data.append('cloud_name', 'dszrxbtng');

            try {
                let userId = userInfo._id;
                console.log(userId,"WWW")
            const res= await Axios.post("https://api.cloudinary.com/v1_1/dszrxbtng/image/upload",data)
            console.log(res,"RESSSSSS")
            console.log("res",res.data.secure_url)
            const imageUrl = res.data.secure_url;

           const resImage = await Axios.put("/api/users/profileimage", {imageUrl,userId});

            const userData = resImage.data.user;
                dispatch(setCredentials({...userData}))
            setImage(imageUrl) ; 
            toast.success('Image uploaded successfully.');
        } catch (error) {
            toast.error(err?.data?.message || err.error);
        }
    };  
    console.log(userInfo,"USERINFO")


  return (
<div className='p-3 max-w-lg mx-auto'>
    <div>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>       
    </div>
    <div className='p-1'>
      <img src={userInfo?.image  || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}
  className="max-w-sm mx-auto rounded-lg shadow-2xl lg:mx-0"
  alt="User Image"   
  width="200" // Set the width to 200 pixels
  height="200"onClick={openFileInput} // Clicking the image opens the file input
  style={{ cursor: 'pointer' }} // Add a pointer cursor to indicate it's clickable
/>
      {/* Hidden file input */}
      <input
        type='file'
        accept="image/*"
        ref={fileInputRef} // Reference to the hidden input
        style={{ display: 'none' }} // Hide the input
        onChange={(e) => setImageSelected(e.target.files[0])}
      />
      <>
              <button onClick={uploadImage}
          className='bg-slate-700  text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80 mx-32'
        > 
            Update Image
        </button>
        </>
</div>
      <form onSubmit={submitHandler} 
      className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          defaultValue={name}
          id='name'
          className='border p-3 rounded-lg'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={email}
          className='border p-3 rounded-lg'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          id='password'
          className='border p-3 rounded-lg'
        />
                <input
          type='password'
          placeholder='confirmPassword'
          onChange={(e) => setConfirmPassword(e.target.value)}
          id='confirmPassword'
          className='border p-3 rounded-lg'
        />

            {isLoading && <Loader />}
        <button 
        // onClick={FormSubmit}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        > 
            Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
        //   onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span 
        className='text-red-700 cursor-pointer' onClick={ logoutHandler}>
          Sign out
        </span>
      </div>

      {/* <p className='text-red-700 mt-5'>{error ? error : ''}</p> */}
      <p className='text-green-700 mt-5'>
        {/* {updateSuccess ? 'User is updated successfully!' : ''} */}
      </p>

    </div>
  
  )
}

export default UserProfileScreen