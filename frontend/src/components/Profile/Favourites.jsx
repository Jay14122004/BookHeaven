
import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import star from '../../assets/star.png';



function Favourites() {

  const [FavouriteBooks, setFavouriteBooks] = useState();

  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async ()=>{
      const response = await axios.get("https://bookheaven-rpnh.onrender.com/api/v1/get-favourite-books",
        {headers}
      );
      // console.log(response.data.data);
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [FavouriteBooks])
  
  return (
    <>
       {FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className='text-5xl font-semibold w-full flex-col h-[100%] text-zinc-500 flex justify-center items-center'>
        No favourite Books
        <img src={star} alt="star" className='h-[20vh]'/>
        </div>)}
       <div className='grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 h-auto gap-4'>
     
      {FavouriteBooks && FavouriteBooks.map((items,index)=>(
          <div key={index}>
            <BookCard data={items} favourite={true}/>
          </div>
      ))}
    </div>
    </>
    
  )
}

export default Favourites
