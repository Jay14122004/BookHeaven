import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { authActions } from '../../store/auth';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function LogIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
    const [Value,setValue] = useState({
      username:"",
      password:"",
    });
  
    const change = (e)=>{
      const {name,value} = e.target;
      setValue({...Value,[name]:value});
    }
  
    const submit = async ()=>{
       try {
        if(
          Value.username == "" ||
          Value.password == "" 
        ){
          alert("All fields are required");
        }else{
          const response = await axios.post("https://bookheaven-rpnh.onrender.com/api/v1/sign-in",Value);
          console.log(response.data);

          dispatch(authActions.login());
          dispatch(authActions.changeRole(response.data.role))
          
          localStorage.setItem("id",response.data.id);
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("role",response.data.role);
          navigate("/Profile");
        }
      } catch (error) {
         alert(error.response.data.message);
      }
      
    }
  
  
  
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center min-h-screen'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>LogIn</p>
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
                value={Value.username}
                onChange={change}
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
              value={Value.password}
              onChange={change}
            />
          </div>

          <div className='mt-4'>
              <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-white hover:text-zinc-900 duration-300' onClick={submit}>
                LogIn
              </button>
            </div>
            <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
                Or
            </p>
            <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
                        Don't have an account &nbsp;
              <Link to={"/signup"} className='hover:text-blue-500 duration-300'>
                    <u>SignUp</u>
              </Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default LogIn
