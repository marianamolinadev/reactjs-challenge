import React from "react";

function Loading() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-opacity-70 bg-black text-white flex flex-col justify-center items-center w-full h-full min-w-screen min-h-screen">
      <div className="h-40 w-20">
        <div className="animate-ping inline-flex h-20 w-20 rounded-full bg-white opacity-75"></div>
      </div>
      <h3 className="text-xl">Loading...</h3>
    </div>
  );
}

export default Loading;
