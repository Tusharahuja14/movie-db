import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';
import noimage from '/no-image.jpg';

const Topnav = () => {
  const [query, setQuery] = useState('');
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (query) {
      GetSearches();
    }
  }, [query]);

  return (
    <div className='w-[80%] h-[7vh] relative flex mx-auto items-center'>
      <i className="text-3xl text-zinc-400 ri-search-line"></i>
      <input 
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text" 
        placeholder='search anything' 
        className='w-[50%] text-white mx-10 p-5 text-xl outline-none border-none bg-transparent'
      />
      {query.length > 0 && (
        <i onClick={() => setQuery("")} className="text-3xl text-zinc-400 ri-close-fill"></i>
      )}
      
      {query.length > 0 && searches.length > 0 && (
        <div className='z-[100] absolute w-[50%] max-h-[50vh] top-[100%] left-[5%] bg-zinc-300 overflow-auto rounded'>
          {searches.map((s, i) => (
            <Link
              key={i} 
              className='hover:text-black font-semibold p-10 text-zinc-600 inline-block w-[100%] flex justify-start border-b-2 border-zinc-100 items-center' 
              to={`/${s.media_type}/details/${s.id}`}
            >
              <img
                className='w-[20vh] h-[20vh] object-cover rounded mr-10 shadow-lg mb-5'
                src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : noimage} 
                alt=""
              />
              <span>{s.original_title || s.name || s.title || s.original_name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topnav;
