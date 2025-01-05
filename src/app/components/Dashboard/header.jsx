// components/layout/Header.js
import { Bell, Settings } from 'lucide-react';

const Header = ({ activeSection }) => (
  <header className="bg-white shadow">
    <div className="px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
      </h2>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
);

export default Header;