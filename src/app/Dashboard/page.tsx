"use client"
import React, { useState } from 'react';
import { 
  LayoutGrid, Package, Users, ShoppingCart, 
  Calendar, Tag, Settings, Bell, PlusCircle,
  Search, Edit, Trash2, Eye
} from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from '@/app/components/ui/dashboardcard';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const stats = {
    totalOrders: 24,
    totalProducts: 150,
    totalCustomers: 234,
    revenue: 15678.45,
    points: 2850,
    reviews: 12
  };

  const recentOrders = [
    { id: '01234', status: 'En cours de livraison', date: '2024-01-04' },
    { id: '02234', status: 'En cours de livraison', date: '2024-01-03' }
  ];

  const products = [
    { 
      id: 1, 
      name: 'iPhone 15 Plus 128Go', 
      price: 779.00,
      stock: 10,
      category: 'Téléphones',
      vendor: 'Alloccaz Store'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        
        <nav className="mt-4">
          <button
            onClick={() => setActiveSection('overview')}
            className={`flex items-center w-full p-4 hover:bg-gray-50 ${
              activeSection === 'overview' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <LayoutGrid className="w-5 h-5 mr-3" />
            Vue d'ensemble
          </button>
          
          <button
            onClick={() => setActiveSection('products')}
            className={`flex items-center w-full p-4 hover:bg-gray-50 ${
              activeSection === 'products' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Package className="w-5 h-5 mr-3" />
            Produits
          </button>

          <button
            onClick={() => setActiveSection('orders')}
            className={`flex items-center w-full p-4 hover:bg-gray-50 ${
              activeSection === 'orders' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            Commandes
          </button>

          <button
            onClick={() => setActiveSection('events')}
            className={`flex items-center w-full p-4 hover:bg-gray-50 ${
              activeSection === 'events' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Événements
          </button>

          <button
            onClick={() => setActiveSection('customers')}
            className={`flex items-center w-full p-4 hover:bg-gray-50 ${
              activeSection === 'customers' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Clients
          </button>

          <button
            onClick={() => setActiveSection('categories')}
            className={`flex items-center w-full p-4 hover:bg-gray-50 ${
              activeSection === 'categories' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Tag className="w-5 h-5 mr-3" />
            Catégories
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
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

        <main className="p-6">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <ShoppingCart className="w-10 h-10 text-blue-500" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Commandes</p>
                        <h3 className="text-2xl font-semibold">{stats.totalOrders}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <Package className="w-10 h-10 text-green-500" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Produits</p>
                        <h3 className="text-2xl font-semibold">{stats.totalProducts}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <Users className="w-10 h-10 text-purple-500" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Points Fidélité</p>
                        <h3 className="text-2xl font-semibold">{stats.points}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <Eye className="w-10 h-10 text-yellow-500" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Avis Clients</p>
                        <h3 className="text-2xl font-semibold">{stats.reviews}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Dernières Commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="divide-y">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="py-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Commande #{order.id}</p>
                          <p className="text-sm text-gray-500">{order.status}</p>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700">
                          Voir détails
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="pl-10 pr-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Ajouter un produit
                </button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendeur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4">{product.name}</td>
                          <td className="px-6 py-4">{product.price.toFixed(2)} €</td>
                          <td className="px-6 py-4">{product.stock}</td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4">{product.vendor}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-3">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;