import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movies from './components/Movies';
import Tvshows from './components/Tvshows';
import People from './components/People';
import Moviedetail from './components/Moviedetail';
import Tvdetail from './components/Tvdetail';
import Persondetails from './components/Persondetails';

function App() {
  return (
    <div className='bg-[#1F1E24] w-screen flex'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movie/details/:id' element={<Moviedetail />} />
        <Route path='/tvshows' element={<Tvshows />} />
        <Route path='/tv/details/:id' element={<Tvdetail />} />
        <Route path='/people' element={<People />} />
        <Route path='/person/details/:id' element={<Persondetails />} />
      </Routes>
    </div>
  );
}

export default App;
