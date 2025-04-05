import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import axios from 'axios';

function SignUp() {

  const navigate = useNavigate();

  const [Value,setValue] = useState({
    username:"",
    email:"",
    password:"",
    address:"",
  });

  const change = (e)=>{
    const {name,value} = e.target;
    setValue({...Value,[name]:value});
  }

  const submit = async ()=>{
     try {
      if(
        Value.username == "" ||
        Value.email == "" ||
        Value.password == "" ||
        Value.address == ""
      ){
        alert("All fields are required");
      }else{
        const response = await axios.post("https://bookheaven-rpnh.onrender.com/api/v1/sign-up",Value);
        // console.log(response.data);
        alert(response.data.message);
        navigate("/LogIn");
      }
    } catch (error) {
      console.log(error);
       alert(error.response.data.message);
    }
    
  }



  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center min-h-screen'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>SignUp</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="a" className='text-zinc-400'> Username</label>
            <input 
              type="text" 
              className='w-full mt-2 bg-zinc-900 text-zinc-100  p-2'
              placeholder='username'
              name='username'
              required
              id='a'
              onChange={change}
              value={Value.username}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="b" className='text-zinc-400'>Email</label>
            <input 
              type="email" 
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2'
              placeholder='example@gamil.com'
              name='email'
              required
              id='b'
              onChange={change}
              value={Value.email}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="c" className='text-zinc-400'>Password</label>
            <input 
              type="password" 
              className='w-full mt-2 bg-zinc-900 text-zinc-100  p-2'
              placeholder='password'
              name='password'
              required
              id='c'
              onChange={change}
              value={Value.password}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="d" className='text-zinc-400'>Address</label>
            <textarea 
              rows="5"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2'
              placeholder='Address'
              name='address'
              required
              id='d'
              onChange={change}
              value={Value.address}
            ></textarea>
          </div>
          <div className='mt-4'>
              <button
                onClick={submit}
              className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-white hover:text-zinc-900 duration-300'>
                SignUp
              </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Or
          </p>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
              Already have an account &nbsp;
              <Link to={"/login"} className='hover:text-blue-500 duration-300'>
                <u>LogIn</u>
              </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
