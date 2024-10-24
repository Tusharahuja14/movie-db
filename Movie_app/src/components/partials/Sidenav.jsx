import React, { useEffect } from 'react'
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';
import Trending from '../Trending';
import Popular from '../Popular';
import Movies from '../Movies';
const Sidenav = () => {
  
  return (
    <div className='w-[25%] h-full  border-r-2 border-zinc-200 p-8'>
  
        <h1 className='text-xl text-white font-bold'>
        <i  className="text-[#6556CD] ri-tv-fill mr-3"></i>
            <span>Movie_DB</span>
        </h1>
        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
        <h1 className='text-white font-semibold text-md mt-5 mb-3'>New Feeds</h1>
        <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-3'><i class=" ri-fire-fill"></i> Trending</Link>
        <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300  p-3'><i class="mr-2 ri-bard-fill"></i> Popular</Link>
        <Link to="/movies" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300  p-3'><i class="mr-2 ri-movie-2-fill"></i> Movies</Link>
        <Link to="/tvshows" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300  p-3'><i class="mr-2 ri-tv-2-fill"></i> TV Shows</Link>
        <Link to="/people" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300  p-3'><i class="mr-2 ri-team-fill"></i>People</Link>
        </nav>
        <hr className='border-none h-1 bg-zinc-400 mt-4'/>
        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
        <h1 className='text-white font-semibold text-xl mt-10 mb-2'>Website Information</h1>
        <Link className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2'><i class="mr-2 ri-information-fill"></i>About Movie_DB</Link>
        <Link className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300  p-2'><i class="mr-2 ri-phone-fill"></i> Contact Us</Link>
        </nav>
    </div>
  )
}

export default Sidenav;