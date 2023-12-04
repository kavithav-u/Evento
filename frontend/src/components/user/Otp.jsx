import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerifyOTPMutation } from '../../Slices/usersApiSlice';
import { setCredentials } from "../../Slices/authSlice";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Otp = () => {
    const [ otp , setOtp ] = useState(['', '', '', '']);;
    const location = useLocation();
    const [verifyOtp] = useVerifyOTPMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const otpSubmit = async (e) => {
        e.preventDefault();
        const enteredOTP = otp.join('');
        try {
            const res = await verifyOtp({name,email,password,enteredOTP}).unwrap();
          console.log(res,"res")
            dispatch(setCredentials({...res.user}));
            if(res.success) {
                toast.success('OTP verification Successfully');
                navigate('/login');
              } else {
                toast.error('OTP verification failed:', res.message);
              }
            } catch (error) {
              console.error('Error in otpSubmit:', error);
              toast.error('An error occurred:', error.message);
            }            
          };

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (value.match(/^[0-9]$/)) {
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);
    
          // Move to the next input field
          if (index < 3 && value !== '') {
            inputRefs[index + 1].current.focus();
          }
        }
      };

  return (
    <div>
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
      <div className="relative border-t-orange-200 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl text-black">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-black">
              <p>We have sent a code to your email </p>
            </div>
          </div>

            <form onSubmit={otpSubmit} className="flex flex-col items-center w-full">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {otp.map((digit, index) => (
                  <div className="w-16 h-16" key={index}>
                    <input
                      ref={inputRefs[index]}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-black focus:bg-gray-500 focus:ring-1 ring-blue-700 text-white"
                      type="text"
                      name={`otp-${index}`}
                      value={digit}
                      maxLength="1"
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-32 border rounded-xl outline-none py-3 bg-green-800 border-none text-white text-sm shadow-sm"
                  >
                  Verify Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default Otp