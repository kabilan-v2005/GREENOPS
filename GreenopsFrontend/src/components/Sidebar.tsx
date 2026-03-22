import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Trash2, AlertTriangle, MessageSquare, LogOut } from 'lucide-react';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Resale Marketplace', path: '/resale', icon: ShoppingBag },
    { name: 'Waste Reports', path: '/reports', icon: Trash2 },
    { name: 'Complaints', path: '/complaints', icon: AlertTriangle },
    { name: 'Feedback', path: '/feedback', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block z-10">
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <span className="text-xl font-bold text-primary-600 flex items-center gap-2">
            <Trash2 className="w-6 h-6" /> GreenOps
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out',
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
