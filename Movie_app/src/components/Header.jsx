import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ data }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}:noimage)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%]'
    >
      <h1 className='text-white text-5xl font-bold'>
        {data.original_title || data.name || data.title || data.original_name}
      </h1>
      <p className='w-[70%] text-white mt-3 mb-3'>
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400'>more</Link>
      </p>
      <p className='text-white'>
        <i className="text-yellow-500 ri-megaphone-fill"></i>
        {data.release_date || "No Information"} 
        <i className="text-yellow-500 ri-album-fill ml-5"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link className='bg-[#6556CD] p-4 rounded text-white font-semibold mt-5'>
        Watch Trailer
      </Link>
    </div>
  )
}

export default Header
