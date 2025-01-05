import { LayoutGrid, Package, Users, ShoppingCart, Calendar, Tag } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'overview', icon: LayoutGrid, label: 'Vue d\'ensemble' },
    { id: 'products', icon: Package, label: 'Produits' },
    { id: 'orders', icon: ShoppingCart, label: 'Commandes' },
    { id: 'events', icon: Calendar, label: 'Événements' },
    { id: 'customers', icon: Users, label: 'Clients' },
    { id: 'categories', icon: Tag, label: 'Catégories' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
      
      <nav className="mt-4">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center w-full p-4 hover:bg-gray-50 ${
              activeSection === id ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;