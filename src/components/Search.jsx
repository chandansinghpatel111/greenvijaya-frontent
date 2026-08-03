import { useState } from "react";
import { Search, Mic, Crosshair } from "lucide-react";

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white shadow-md p-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row justify-center md:justify-between">
        
        {/* Navigation Links - Centered */}
        <div className="flex flex-wrap justify-center space-x-6 text-gray-700 font-medium mb-4 md:mb-0">
          <span className="text-black font-bold border-b-2 border-blue-500 pb-1 cursor-pointer">Buy</span>
          <span className="cursor-pointer hover:text-blue-600">Rent</span>
          <span className="cursor-pointer hover:text-blue-600 relative">
            New Launch
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </span>
          <span className="cursor-pointer hover:text-blue-600">PG / Co-living</span>
          <span className="cursor-pointer hover:text-blue-600">Commercial</span>
          <span className="cursor-pointer hover:text-blue-600">Plots/Land</span>
          <span className="cursor-pointer hover:text-blue-600">Projects</span>
        </div>

        {/* Search Bar Container - Responsive */}
        <div className="flex flex-col md:flex-row items-center bg-gray-100 rounded-full p-2 w-full md:w-2/3 lg:w-1/2 space-y-2 md:space-y-0">
          <div className="relative flex-grow flex items-center w-full">
            {/* Dropdown for Property Type */}
            <select className="bg-transparent text-gray-700 px-3 py-2 focus:outline-none border-r border-gray-300">
              <option>All Residential</option>
              <option>Buy</option>
              <option>Rent</option>
            </select>

            {/* Search Input */}
            <Search className="h-5 w-5 text-gray-500 absolute left-12" />
            <input
              type="text"
              placeholder='Search "PG in sector 74 noida"'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent pl-10 pr-4 py-2 focus:outline-none"
            />
          </div>

          {/* Icons */}
          <div className="flex space-x-2">
            <Crosshair className="h-5 w-5 text-blue-600 bg-blue-100 p-2 rounded-full cursor-pointer" />
            <Mic className="h-5 w-5 text-blue-600 bg-blue-100 p-2 rounded-full cursor-pointer" />
          </div>

          {/* Search Button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
