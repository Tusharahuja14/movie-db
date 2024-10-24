import React, { useEffect, useState } from 'react';
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import axios from '../utils/axios';
import Header from './Header';
import HorizontalCards from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown';
import Loading from './partials/Loading';
const Home = () => {
    document.title="Movie_app | Homepage"

    const[wallpaper,Setwallpaper]=useState(null);
    const[trending,Settrending]=useState(null);
    const[category,setcategory]=useState("all");
    const Getheaderwallpaper=async()=>{
      try{
        const{data}=await axios.get(`/trending/all/day`);
    let randomdata= data.results[(Math.random()*data.results.length+1).toFixed()];
    Setwallpaper(randomdata);
      }
      catch(error)
      {
        console.log("Error",error);
      }
    };
    const Gettrending=async()=>{
      try{
        const{data}=await axios.get(`/trending/${category}/day`);
    Settrending(data.results);
      }
      catch(error)
      {
        console.log("Error",error);
      }
    }; 
    useEffect(()=>{
      Gettrending();
   !wallpaper&&Getheaderwallpaper();
    },[category]);
  return wallpaper&&trending?(
    <>    
    <Sidenav/>
    <div className='w-[75%] h-full overflow-auto overflow-x-hidden '>
        <Topnav/>
        <Header data={wallpaper}/>

        <div className=' flex justify-between p-10'>
                <h1 className='text-3xl font-semibold zinc-400 text-zinc-400'>Trending</h1>
             <Dropdown title="Filter" options={["tv","movie","all"]} func={(e)=>setcategory(e.target.value)}/>
            </div>
        <HorizontalCards data={trending}  />
    </div>
    </>

  ):<Loading/>

}

export default Home;

