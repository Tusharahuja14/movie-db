import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { asyncloadmovie } from '../store/Actions/Movieactions';
import { Link } from 'react-router-dom';
import Loading from './partials/Loading';

const Moviedetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.movie);

    useEffect(() => {
        if (id) {
            dispatch(asyncloadmovie(id));
        } else {
            console.error("Movie ID is undefined or null");
        }
    }, [id, dispatch]);

    if (!info) {
        return <Loading />;
    }

    const homepageUrl = info?.detail?.homepage || '#';
    const backdropPath = info?.detail?.backdrop_path || 'default-backdrop.jpg'; // Fallback to a default image
    const posterPath = info?.detail?.poster_path || backdropPath; // Use backdrop if poster is unavailable

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${backdropPath})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            className='w-screen h-screen px-[10%]'
        >
            {/* Navigation */}
            <nav className='h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-xl'>
                <Link 
                    onClick={() => navigate(-1)}
                    className='hover:text-[#6556CD] ri-arrow-left-line'
                >
                    {/* Icon content */}
                </Link>
                <a href={homepageUrl} target='_blank' rel="noopener noreferrer">
                    <i className='ri-external-link-fill'></i>
                </a>
                <a target='_blank' href={`https://www.wikidata.org/wiki/${info?.externalid?.wikidata_id}`} rel="noopener noreferrer">
                    <i className='ri-earth-fill'></i>
                </a>
                <a target='_blank' href={`https://www.imdb.com/title/${info?.externalid?.imdb_id}/`} rel="noopener noreferrer">IMDB</a>
            </nav>

            {/* Content */}
            <div className='w-full flex'>
                <div>
                    <img
                        className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover'
                        src={`https://image.tmdb.org/t/p/original/${posterPath}`}
                        alt="Movie Poster"
                    />
                    <div>
                        {info?.watchproviders?.flatrate?.map((provider) => (
                            <img 
                                key={provider.provider_id}
                                src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                                alt={provider.provider_name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Moviedetail;
