import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Scissors, Home, Bell, Search, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const NavButton = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
          isActive 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-purple-600'
        }`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg animate-pulse">
                <Scissors size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Salon Manager</h1>
                <p className="text-xs text-gray-500">Professional Beauty Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
          
          <nav className="flex space-x-1 pb-4">
            <NavButton to="/" icon={Home} label="Dashboard" />
            <NavButton to="/customers" icon={Users} label="Customers" />
            <NavButton to="/services" icon={Scissors} label="Services" />
            <NavButton to="/bookings" icon={Calendar} label="Bookings" />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;