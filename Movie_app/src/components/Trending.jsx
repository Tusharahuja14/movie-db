import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('all');
  const [duration, setDuration] = useState('day');
  const [trending, setTrending] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setpage]=useState(1);
  document.title="MPVIE_DB/Trending/"+category.toUpperCase();
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
   
      if (data.results.length> 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setpage(page+1);
      }
      else{
        setHasMore(false);
      }
    } catch (error) {
      console.log('Error', error);
      setHasMore(false);
    }
  };
const refreshHandler=()=>{
  if(trending.length===0)
  {
    getTrending();
  }
  else{
   setpage(1);
   setTrending([]);
   getTrending();

  }
}
  useEffect(() => {
    setTrending([]); // Reset the list when category or duration changes
    setHasMore(true); // Reset hasMore to true
    getTrending();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="p-[3%] w-screen">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <h1 className="w-[20%] text-2xl flex font-semibold text-zinc-400">
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
            {" "}Trending
          </h1>
        </Link>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown title="Category" options={['movie', 'tv', 'all']} func={(e) => setCategory(e.target.value)} />
          <div className="w-[2%]"></div>
          <Dropdown title="Duration" options={['week', 'day']} func={(e) => setDuration(e.target.value)} />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
