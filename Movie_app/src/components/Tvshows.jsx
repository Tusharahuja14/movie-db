import axios from '../utils/axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import Loading from './partials/Loading';

const Tvshows = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('airing_today');
  const [TV, setTV] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  document.title = "MOVIE_DB/TV_Shows/" + category.toUpperCase();

  const getTV = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      console.log(data);
      if (data.results.length > 0) {
        setTV((prevState) => [...prevState, ...data.results]);
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
    setTV([]);
    getTV();
  };

  useEffect(() => {
    setTV([]);
    setPage(1);
    setHasMore(true);
    getTV();
  }, [category]);

  return TV.length > 0 ? (
    <div className="p-[3%] w-screen">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <h1 className="w-[20%] text-2xl flex font-semibold text-zinc-400">
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
            {" "}TV <small className='text-sm mt-3 text-zinc-700 ml-2'>{category.toUpperCase()}</small>
          </h1>
        </Link>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown title="Category" options={['popular', 'top_rated', 'airing_today', 'on_the_air']} func={(e) => setCategory(e.target.value)} />
        </div>
      </div>
      <InfiniteScroll
        dataLength={TV.length}
        next={getTV}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={TV} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tvshows;
