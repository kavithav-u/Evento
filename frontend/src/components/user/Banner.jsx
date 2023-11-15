import React from 'react'

const Banner = () => {
  return (
    <div className="banner relative">
    <img
      src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Banner Image"
      className="object-cover h-100 w-full"
    />
    {/* <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black to-transparent opacity-70"></div> */}
    <div className="absolute inset-0 flex items-center justify-center text-white text-center">
      <h1 className="text-4xl md:text-6xl font-bold">Our Services</h1>
      {/* <p className="text-lg md:text-2xl mt-4">Your banner description goes here.</p> */}
    </div>
  </div>
  )
};


const AboutBanner = () => {
  return (
    <div className="banner relative">
    <img
      src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Banner Image"
      className="object-cover h-80 w-full"
    />
    {/* <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black to-transparent opacity-70"></div> */}
    <div className="absolute inset-0 flex items-center justify-center text-white text-center">
      <h1 className="text-4xl md:text-6xl font-bold">Our Services</h1>
      {/* <p className="text-lg md:text-2xl mt-4">Your banner description goes here.</p> */}
    </div>
  </div>
  )
}

export {
  Banner, 
  AboutBanner
}


