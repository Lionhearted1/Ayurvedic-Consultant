import React from 'react';
// import Backgroundvid from "../public/bkgrndvd.mp4";

const Background = () => {
  return (
    <div className="main">
      <div className='flex justify-center'>
        <div className="absolute top-0 left-0 w-full h-full" id='color'></div>
        <video src="/videos/video.mp4" autoPlay loop muted className='absolute top-0 left-0 w-full h-full object-cover' id='index'></video>
      </div>
    </div>
  );
}

export default Background;
