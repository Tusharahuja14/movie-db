import axios from '../utils/axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import Loading from './partials/Loading';

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('popular');
  const [people, setPeople] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  document.title = "MOVIE_DB/People/" + category.toUpperCase();

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
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
    setPeople([]);
    getPeople();
  };

  useEffect(() => {
    setPeople([]);
    setPage(1);
    setHasMore(true);
    getPeople();
  }, [category]);

  return people.length > 0 ? (
    <div className="p-[3%] w-screen">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <h1 className="w-[20%] text-2xl flex font-semibold text-zinc-400">
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
            {" "}People
          </h1>
        </Link>
        <div className="flex items-center w-[80%]">
          <Topnav />
        </div>
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={getPeople}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
