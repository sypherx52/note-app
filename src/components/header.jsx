import React from "react";
import {
  RiSearchLine,
  RiMore2Fill,
  RiUserLine,
} from "@remixicon/react";

const Header = ({searchTerm,setSearchTerm}) => {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6">
        
        {/* Search */}
        <div className="flex flex-1 justify-center">
          <div className="relative w-full max-w-xl">
            <RiSearchLine
              size={19}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
            value={searchTerm || ""}
            onChange={(e)=>{setSearchTerm(e.target.value)
              console.log(e.target.value)
            }}
              type="search"
              placeholder="Search your notes..."
              className="
                w-full rounded-xl
                border border-gray-200
                bg-gray-100
                py-2.5 pl-10 pr-4
                text-sm text-gray-700
                placeholder:text-gray-400
                outline-none
                transition-all
                focus:border-cyan-400
                focus:bg-white
                focus:ring-4
                focus:ring-cyan-100
              "
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="More options"
            className="
              rounded-full p-2.5
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-800
            "
          >
            <RiMore2Fill size={20} />
          </button>

          <button
            type="button"
            aria-label="User profile"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              bg-cyan-600
              text-white
              shadow-sm
              transition
              hover:bg-cyan-700
              hover:shadow-md
            "
          >
            <RiUserLine size={19} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;