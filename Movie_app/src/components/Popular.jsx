import axios from '../utils/axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import Loading from './partials/Loading';

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('movie');
  const [duration, setDuration] = useState('day');
  const [popular, setPopular] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  document.title="MOVIE_DB/Popular/"+category.toUpperCase();
  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      console.log(data);
      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log('Error', error);
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setPopular([]);
    getPopular();
  };

  useEffect(() => {
    setPopular([]); // Reset the list when category or duration changes
    setPage(1); // Reset the page to 1
    setHasMore(true); // Reset hasMore to true
    getPopular();
  }, [category, duration]);

  return popular.length > 0 ? (
    <div className="p-[3%] w-screen">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <h1 className="w-[20%] text-2xl flex font-semibold text-zinc-400">
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
            {" "}Popular
          </h1>
        </Link>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown title="Category" options={['movie', 'tv']} func={(e) => setCategory(e.target.value)} />
       
         
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
