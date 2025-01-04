"use client"
import React, { useState } from 'react';
import { 
  LayoutGrid, Package, Users, ShoppingCart, 
  Calendar, Tag, Settings, Bell, PlusCircle,
  Search, Edit, Trash2, Eye, MapPin, Image
} from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from '../components/ui/dashboardcard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // États étendus
  const stats = {
    totalOrders: 24,
    totalProducts: 150,
    totalCustomers: 234,
    revenue: 15678.45,
    points: 2850,
    reviews: 12
  };

  // Données améliorées pour les produits
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Plus 128Go',
      price: 779.00,
      stock: 10,
      category: 'Téléphones',
      vendor: 'Alloccaz Store',
      condition: 'Reconditionné - Comme neuf',
      location: 'Paris 11ème',
      images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
      description: 'iPhone 15 Plus en excellent état, batterie 100%'
    }
  ];

  // Données pour les événements
  const events = [
    {
      id: 1,
      title: 'Vente Flash iPhone',
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      description: 'Réduction de 20% sur tous les iPhones',
      status: 'À venir',
      type: 'Promotion'
    }
  ];

  // Données pour les clients
  const customers = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      points: 450,
      joinDate: '2023-12-01',
      totalOrders: 5,
      status: 'Actif',
      lastPurchase: '2024-01-02'
    }
  ];

  // Données pour les catégories
  const categories = [
    {
      id: 1,
      name: 'Téléphones',
      description: 'Smartphones et téléphones portables',
      productsCount: 45,
      subcategories: ['Apple', 'Samsung', 'Xiaomi'],
      status: 'Actif'
    }
  ];

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher un produit..."
            className="pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="flex items-center bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">État</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localisation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.price.toFixed(2)} €</td>
                  <td className="px-6 py-4">{product.condition}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      {product.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {product.images.map((_, index) => (
                        <div key={index} className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <Image className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </td>
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
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gestion des événements</h3>
        <Button className="flex items-center bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="w-5 h-5 mr-2" />
          Nouvel événement
        </Button>
      </div>

      <Card>
        <CardContent>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p>Début: {event.startDate}</p>
                      <p>Fin: {event.endDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{event.type}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                      {event.status}
                    </span>
                  </td>
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
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gestion des clients</h3>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Rechercher un client..."
            className="w-64"
          />
          <Button className="flex items-center bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="w-5 h-5 mr-2" />
            Nouveau client
          </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commandes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{customer.points}</td>
                  <td className="px-6 py-4">{customer.totalOrders}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                      {customer.status}
                    </span>
                  </td>
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
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gestion des catégories</h3>
        <Button className="flex items-center bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="w-5 h-5 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      <Card>
        <CardContent>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sous-catégories</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{category.productsCount}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, index) => (<span key={index} className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                      {category.status}
                    </span>
                  </td>
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
  );

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
                        <p className="text-sm text-gray-500">Clients</p>
                        <h3 className="text-2xl font-semibold">{stats.totalCustomers}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <Eye className="w-10 h-10 text-yellow-500" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Avis</p>
                        <h3 className="text-2xl font-semibold">{stats.reviews}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'products' && renderProducts()}
          {activeSection === 'events' && renderEvents()}
          {activeSection === 'customers' && renderCustomers()}
          {activeSection === 'categories' && renderCategories()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;