import React from "react";

interface MobleMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobleMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-4 ">
        <div className="px-3 text-center text-white text-sm hover:underline">
          Home
        </div>
        <div className="px-3 text-center text-white text-sm hover:underline">
          Tv Shows
        </div>
        <div className="px-3 text-center text-white text-sm hover:underline">
          Movies
        </div>
        <div className="px-3 text-center text-white text-sm hover:underline">
          New & Popular
        </div>
        <div className="px-3 text-center text-white text-sm hover:underline">
          My List
        </div>
        <div className="px-3 text-center text-white text-sm hover:underline">
          Browse by Languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
