import React from "react";

const TopBar = ({ username, email, onLogout }) => {
  return (
    <div className=" w-full text-black flex justify-between items-center px-6 py-4 z-40">
      {/* User Info */}
      <div className="flex flex-col items-start">
        <span className="font-semibold">{username}</span>
        <span className="text-sm text-gray-500">{email}</span>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="flex items-center space-x-2 bg-[#F9C650] hover:bg-[#375A7F] rounded-md px-4 py-2 transition"
      >
        <img
          src="/solar_logout-2-bold.svg"
          alt="Logout Icon"
          className="w-6 h-6"
        />
        <span className="text-sm font-bold text-white">Déconnecter</span>
      </button>
    </div>
  );
};

export default TopBar;
