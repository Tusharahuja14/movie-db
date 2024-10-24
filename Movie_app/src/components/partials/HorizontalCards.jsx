import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full mt-4 overflow-x-scroll p-5 space-x-5 flex">
      {data.map((item) => {
        const {
          id,
          backdrop_path,
          poster_path,
          original_title,
          name,
          title,
          original_name,
          overview,
          media_type,
        } = item;

        const imageUrl = backdrop_path || poster_path
          ? `https://image.tmdb.org/t/p/original/${backdrop_path || poster_path}`
          : 'https://via.placeholder.com/300x169?text=No+Image';

        const cardTitle = original_title || name || title || original_name || 'Untitled';
        const cardOverview = overview ? `${overview.substring(0, 60)}...` : 'No description available.';

        return (
          <div
            key={id}
            className="flex-shrink-0 w-64 bg-zinc-900 rounded-lg overflow-hidden shadow-lg"
          >
            <Link
              to={`/${media_type}/details/${id}`}
              className="block"
            >
              <img
                src={imageUrl}
                alt={cardTitle}
                className="w-full h-36 object-cover"
                loading="lazy"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-white text-lg font-semibold mb-2 line-clamp-1">
                {cardTitle}
              </h2>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {cardOverview}
              </p>
              <Link
                to={`/details/${id}`}
                className="text-indigo-500 hover:underline text-sm"
              >
                Read more
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

HorizontalCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
    original_title: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    original_name: PropTypes.string,
    overview: PropTypes.string,
    media_type: PropTypes.string.isRequired,
  })).isRequired,
};

export default HorizontalCards;
