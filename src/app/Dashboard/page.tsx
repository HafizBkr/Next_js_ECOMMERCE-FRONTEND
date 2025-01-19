// /src/app/dashboard/AdminDashboard.tsx
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Utilisation de next/navigation pour la redirection côté serveur
import Sidebar from '../components/Dashboard/sidebar';
import Header from '../components/Dashboard/header';
import Overview from '../components/Dashboard/overview';
import ProductSection from '../components/Dashboard/productSection';
import EventSection from '../components/Dashboard/EventSection';
import CustomerSection from '../components/Dashboard/CustomerSection';
import CategorySection from '../components/Dashboard/CategorySection';
import useAuth from '../hooks/useAuth'; 

// Types pour les données
type Stats = {
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenue: number;
  points: number;
  reviews: number;
};

type Product = {
  id: number | string;
  name: string;
  price: number;
  status: string;
  stock: number;
  location: string;
  images: string[];
};

type Event = {
  id: number | string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
};

type Customer = {
  id: number | string;
  name: string;
  email: string;
  points: number;
  totalOrders: number;
  status: string;
};

type Category = {
  id: number | string;
  name: string;
  description: string;
  productsCount: number;
  subcategories: string[];
  status: string;
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const router = useRouter(); // Redirection avec next/navigation

  // États simulés pour les données
  const stats: Stats = {
    totalOrders: 24,
    totalProducts: 150,
    totalCustomers: 234,
    revenue: 15678.45,
    points: 2850,
    reviews: 12,
  };

  const products: Product[] = [
    { id: 1, name: 'Produit A', price: 20, status: 'Disponible', stock: 15, location: 'Entrepôt A', images: [] },
    { id: 2, name: 'Produit B', price: 35, status: 'Indisponible', stock: 0, location: 'Entrepôt B', images: [] },
  ];

  const events: Event[] = [
    { id: 1, title: 'Événement A', description: 'Description A', startDate: '2023-01-01', endDate: '2023-01-02', type: 'Public', status: 'Actif' },
  ];

  const customers: Customer[] = [
    { id: 1, name: 'Client A', email: 'clientA@example.com', points: 120, totalOrders: 5, status: 'Actif' },
  ];

  const categories: Category[] = [
    { id: 1, name: 'Catégorie A', description: 'Description A', productsCount: 10, subcategories: ['Sous-cat 1'], status: 'Active' },
  ];

  // Gestionnaires d'ajout
  const handleAddProduct = () => setShowAddForm(true);
  const handleAddEvent = () => setShowAddForm(true);
  const handleAddCustomer = () => setShowAddForm(true);
  const handleAddCategory = () => setShowAddForm(true);

  // Vérifier l'existence du token dans localStorage
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      // Si aucun token n'est trouvé, rediriger vers la page de connexion
      router.push('/login');
    }
  }, [router]);

  useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 overflow-auto">
        <Header activeSection={activeSection} />
        <main className="p-6">
          {activeSection === 'overview' && <Overview stats={stats} />}
          {activeSection === 'products' && (
            <ProductSection
              products={products}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
          {activeSection === 'events' && <EventSection />}
          {activeSection === 'customers' && (
            <CustomerSection customers={customers} onAddCustomer={handleAddCustomer} />
          )}
          {activeSection === 'categories' && (
            <CategorySection categories={categories} onAddCategory={handleAddCategory} />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
