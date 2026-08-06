import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, UserCircle, LogOut } from 'lucide-react';
import authService from '../services/authService';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('Guest');
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user?.userName) {
      setUserName(user.userName);
    }
  }, []);

  /**
   * Handle logout
   */
  const handleLogout = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          {/* Search Bar */}
          <div className="w-full max-w-md hidden md:flex items-center relative text-gray-400 focus-within:text-gray-600">
            <Search className="w-5 h-5 absolute left-3" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 relative">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">User</p>
            </div>

            {/* Profile button with dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <UserCircle className="w-8 h-8" />
              </button>

              {/* Logout Dropdown */}
              {showLogoutMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
