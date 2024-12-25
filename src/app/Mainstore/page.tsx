import React from 'react';

const LandingPage = () => {
  return (
    <div className="container mx-auto relative">
      {/* Hero Banner */}
      <div className="relative mb-8 h-[800px] w-full overflow-hidden rounded-lg bg-[#e8f4f3]">

        {/* Content */}
        <div className="flex h-full flex-col items-center justify-center text-center">
          {/* Sofa Video */}
          <div className=" w-full h-full">
            <video
              className="h-full w-full rounded-lg bg-gray-200 object-cover"
              src="/landing.mp4"
              autoPlay
              loop
              muted
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
