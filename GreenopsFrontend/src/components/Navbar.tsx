import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          {/* Mobile menu button could go here */}
          <div className="w-full max-w-md hidden md:flex items-center relative text-gray-400 focus-within:text-gray-600">
            <Search className="w-5 h-5 absolute left-3" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-primary-500 focus:bg-white text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Citizen</p>
            </div>
            <button className="text-gray-400 hover:text-primary-600 transition-colors">
              <UserCircle className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
