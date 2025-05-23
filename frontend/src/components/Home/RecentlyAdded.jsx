import React, { useEffect,useState } from 'react'
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

function RecentlyAdded() {
    const [Data, setData] = useState();
    useEffect(() => {
      const fetch = async()=>{
        const response = await axios.get("https://bookheaven-rpnh.onrender.com/api/v1/get-recent-books");
        setData(response.data.data);
      };
      fetch();
    }, []);
    
  return (
    <div className='mt-8 px-4'>
        <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
        {!Data && <div className='flex items-center justify-center my-12'>
          <Loader/>
          </div>}
        <div className='my-8 grid grid-cols-1 md:grid-cols-4 gap-8 sm:grid-cols-3'>
          {Data && Data.map((items,index)=>(
            <div key={index}>
              <BookCard data={items}/>
              </div>
          ))}
        </div>
    </div>
  )
}

export default RecentlyAdded
