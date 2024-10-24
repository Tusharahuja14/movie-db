import axios from '../utils/axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import Loading from './partials/Loading';

const Movies = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('now_playing');
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  document.title = "MOVIE_DB/Movies/" + category.toUpperCase();

  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      console.log(data);
      if (data.results.length > 0) {
        setMovies((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log('Error', error);
      setHasMore(false);
    }
  };
  const sliderpercent=()=>{
    
  }
  const refreshHandler = () => {
    setPage(1);
    setMovies([]);
    getMovies();
  };

  useEffect(() => {
    setMovies([]); // Reset the list when category changes
    setPage(1); // Reset the page to 1
    setHasMore(true); // Reset hasMore to true
    getMovies();
  }, [category]);

  return movies.length > 0 ? (
    <div className="p-[3%] w-screen">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <h1 className="w-[20%] text-2xl flex font-semibold text-zinc-400">
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
            {" "}Movies <small className='text-sm mt-3 text-zinc-700 m-2'>{category.toUpperCase()}</small>
          </h1>
        </Link>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown title="Category" options={['popular', 'top_rated',"upcoming","now_playing"]} func={(e) => setCategory(e.target.value)} />
        </div>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={getMovies}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
