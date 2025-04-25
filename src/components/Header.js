import React from "react";
import { Download } from "lucide-react";
import logo from "../../public/logo.jpg"; // Adjust the path as necessary
// Header
const Header = ({ exportDailySummary }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-3 bg-white rounded-full p-1 flex items-center justify-center w-12 h-12">
          {/* <img src="./public/logo.jpg" alt="Logo" /> */}
        </div>
        <h1 className="text-2xl font-bold">The Fusion Cubes</h1>
      </div>
      <div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600"
          onClick={exportDailySummary}
        >
          <Download size={18} className="mr-1" /> Export Summary
        </button>
      </div>
    </header>
  );
};
export default Header;
