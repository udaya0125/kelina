import React from "react";

const HoverCard = () => {
  return (
    <div className="group relative w-80 h-48 bg-white shadow-lg overflow-hidden ">
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 transition-all duration-500"></div>

      <div className="absolute inset-0 z-10">
        {/* Content inside the card */}
        <div className="flex items-center justify-center h-full">
          <h2 className="text-xl font-semibold">Hover over me</h2>
        </div>
      </div>

      {/* Custom animated border */}
      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-500 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
      <span className="absolute top-0 right-0 h-[2px] w-full bg-blue-500 transform translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500"></span>
      <span className="absolute top-0 left-0 h-full w-[2px] bg-blue-500 transform translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500"></span>
      <span className="absolute bottom-0 right-0 h-full w-[2px] bg-blue-500 transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></span>
    </div>
  );
};

export default HoverCard;