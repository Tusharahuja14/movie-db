import React from 'react';
import loaderImage from '/loader.webp';

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='h-[50%]  object-cover' src={loaderImage} alt="Loading..." />
    </div>
  );
}

export default Loading;
