import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';

function ViewBookDetail() {
    const navigate =  useNavigate();
    const { id } = useParams();
    const [Data, setData] = useState();
    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
    const role = useSelector((state)=> state.auth.role);
    console.log(isLoggedIn);
    console.log(role);

    
    useEffect(() => {
        const fetch = async()=>{
            const response = await axios.get(
                `https://bookheaven-rpnh.onrender.com/api/v1/get-book-by-id/${id}`
            );
            setData(response.data.data);
        };
        fetch();
    }, []);

    const headers = {
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
        bookid:id,
    };

    const handleFavourite = async()=>{
        const response = await axios.put("https://bookheaven-rpnh.onrender.com/api/v1/add-book-to-favourite",
            {},
            {headers}
        );
        alert(response.data.message);
    };

    const handleCart = async()=>{
        const response = await axios.put("https://bookheaven-rpnh.onrender.com/api/v1/add-to-cart",
            {},
            {headers}
        );
        alert(response.data.message);
    };

    const deleteBook = async()=>{
        const response = await axios.delete("https://bookheaven-rpnh.onrender.com/api/v1/delete-book",{headers});
        alert(response.data.message);
        navigate("/all-books");
    }
    
  return (
    <>
        {Data && (
            <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start min-h-screen'>
            <div className='w-full lg:w-3/6 '> 
                <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 rounded p-8 lg:p-12'>
                    <img src={Data.url} alt="Book" className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded' />
                    {isLoggedIn==true && role==="user" && (
                    <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start lg:mt-0 mt-8'>
                         <button className = "cursor-pointer bg-white rounded lg:rounded-full text-4xl lg:text-xl p-3 text-red-500 flex items-center justify-center" 
                         onClick={handleFavourite}>
                            <FaHeart /> <span className='ms-4 block lg:hidden'>Favourites</span>
                            </button>
                         <button className = "cursor-pointer text-white rounded lg:rounded-full text-4xl lg:text-xl p-3 md:mt-0 mt-8 lg:mt-8 bg-blue-500 flex items-center justify-center"
                         onClick={handleCart}>
                            <IoCartSharp/> <span className='ms-4 block lg:hidden'>Add to cart</span>
                            </button>
                     </div>
                    )}
                    {isLoggedIn==true && role==="admin" && (
                    <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start lg:mt-0 mt-8'>
                        <Link to={`/updateBook/${id}`} className = "cursor-pointer bg-white rounded lg:rounded-full text-4xl p-3 lg:text-xl flex items-center justify-center"><FaEdit/><span className='ms-4 block lg:hidden'>Edit</span></Link>
                        <button className = "cursor-pointer text-red-500 rounded lg:rounded-full text-4xl lg:text-xl p-3 md:mt-0 mt-8 lg:mt-8 bg-white flex items-center justify-center" onClick={deleteBook}><MdDelete/> <span className='ms-4 block lg:hidden'>Delete Book</span></button>
                    </div>
                    )}
                </div>
            </div>
            <div className='p-4 w-full lg:w-3/6'>
                <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
                <p className='text-zinc-400 mt-1'>by {Data.author}</p>
                <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
                <p className='flex mt-4 items-center justify-start text-zinc-400'>
                    <GrLanguage className='me-3 '/> {Data.language}
                </p>
                <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
                    Price : {Data.price}
                </p>
            </div>
            </div>
        )}

        {!Data && (
            <div className='h-screen bg-zinc-900 flex items-center justify-center'>
                <Loader />
            </div>
        )}
    </>
  )
}

export default ViewBookDetail
