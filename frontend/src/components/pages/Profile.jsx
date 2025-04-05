import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Loader from '../Loader/Loader';
import SideBar from '../Profile/SideBar';
import { Outlet } from 'react-router-dom';
import MobileNav from '../Profile/MobileNav';


function Profile() {
  const [Profile, setProfile] = useState();
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async()=>{
      const response = await axios.get(
        "https://bookheaven-rpnh.onrender.com/api/v1/get-user-information",
        {headers}
      );
      setProfile(response.data);
    };
    fetchData();
  }, []);
  

  return (
    <div className='bg-zinc-900  px-4 md:px-12 flex flex-col md:flex-row min-h-screen py-8 gap-4 text-white'>
      {!Profile && (
        <div className='w-full h-screen flex items-center justify-center'>
        <Loader/>
        </div>
      )}
      {Profile && (
        <>
        <div className='w-full md:w-1/6 h-auto lg:h-screen'>
          <SideBar data={Profile}/>
          <MobileNav/>
        </div>
        <div className='w-full md:w-5/6'>
          <Outlet/>  
        </div>        
        </>
      )}
    
    </div>
  )
}

export default Profile
