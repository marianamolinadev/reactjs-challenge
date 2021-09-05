import React from "react";

function Loading() {
  return (
    <div className="absolute bg-opacity-70 bg-black text-white flex flex-col justify-center items-center h-screen w-full">
      <div className="h-40 w-20">
        <div className="animate-ping inline-flex h-20 w-20 rounded-full bg-white opacity-75"></div>
      </div>
      <h3 className="text-xl">Loading...</h3>
    </div>
  );
}

export default Loading;
