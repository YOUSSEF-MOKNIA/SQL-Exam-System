import React from "react";

const Sidebar = ({ onLogout }) => {
  const handleLogoutClick = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Call the onLogout function passed as a prop (optional, to update app state)
    onLogout();
  };

  return (
    <div className="w-52 h-screen fixed bg-[#4C6E9B] text-white flex flex-col">
      {/* Logo and System Name */}
      <div className="flex items-center justify-center py-6">
        <img
          src="syslogo.svg" // Replace with your logo path in the public folder
          alt="System Logo"
          className="w-14 h-14 mr-3"
        />
        <span className="text-2xl font-bold">
          ASK<span className="text-[#F9C650]">.Base</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Historique</h3>
          <img
            src="/bi_trash-fill.svg" // Delete icon from the public folder
            alt="Delete Icon"
            className="cursor-pointer hover:text-indigo-400 w-4 h-4"
          />
        </div>
        <ul className="space-y-3">
          <li className="cursor-pointer hover:text-indigo-400">Exam 1</li>
          <li className="cursor-pointer hover:text-indigo-400">Exam 2</li>
          <li className="cursor-pointer hover:text-indigo-400">Exam 3</li>
        </ul>
      </div>

      {/* User Profile and Logout */}
      <div className="px-4 py-6 mt-auto">
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center justify-start py-2 text-sm text-white hover:bg-[#E2B7D2] rounded-md"
        >
          <img
            src="/solar_logout-2-bold.svg" // Logout icon from the public folder
            alt="Logout Icon"
            className="mr-3 w-8 h-8"
          />
           <p className="text-sm font-bold text-white">Logout</p>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-4">
        <p className="text-sm text-white">&copy; 2024 ASK.Base</p>
      </div>
    </div>
  );
};

export default Sidebar;
