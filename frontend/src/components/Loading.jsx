import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-screen w-screen bg-white/20 flex items-center justify-center z-50 ">
      <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
    </div>
  );
};

export default Loading;
