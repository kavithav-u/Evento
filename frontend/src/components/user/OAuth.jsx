import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../../firebase';
import { useGoogleAuthMutation } from '../../Slices/usersApiSlice';
import { setCredentials } from "../../Slices/authSlice";
import { useDispatch } from 'react-redux';



export default function OAuth() {


    const dispatch = useDispatch();
    const [googleAuth, {isLoading}] = useGoogleAuthMutation();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            console.log(result);

            const res= await googleAuth({
                name: result.user.displayName,
                email: result.user.email,
                image: result.user.photoURL,}).unwrap();

                dispatch(setCredentials({...res}));
                console.log(setCredentials,"AFTER")
                navigate('/')

        } catch (error) {
            console.log('could not sign in with google', error)       
        }
    }
  return (
<button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
      Continue with google
    </button>  )
}

