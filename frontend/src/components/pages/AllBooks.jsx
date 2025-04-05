import React from 'react'
import Loader from '../Loader/Loader'
import BookCard from '../BookCard/BookCard'
import { useState,useEffect } from 'react';
import axios from "axios"

function AllBooks() {

  const [Data, setData] = useState();
    useEffect(() => {
      const fetch = async()=>{
        const response = await axios.get("https://bookheaven-rpnh.onrender.com/api/v1/get-all-books");
        setData(response.data.data);
      };
      fetch();
    }, []);
    
  return (
    <div className='bg-zinc-900 px-12 py-8 min-h-screen h-auto'>
      <h4 className='text-3xl text-yellow-100'>All Books</h4>
      {!Data && <div className='flex items-center h-screen w-full justify-center'>
          <Loader/>
          </div>}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 sm:grid-cols-3'>
          {Data && Data.map((items,index)=>(
            <div key={index}>
              <BookCard data={items}/>
              </div>
          ))}
        </div>
    </div>
  )
}

export default AllBooks
