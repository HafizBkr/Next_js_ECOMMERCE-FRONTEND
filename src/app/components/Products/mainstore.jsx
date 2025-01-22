import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import Clavier from "@/app/public/images/clavier.avif";
import useProducts from '../../hooks/useProducts';
import { useRouter } from 'next/navigation';

const Filters = () => (
  <div className="space-y-6">
    {/* Recherche */}
    <div>
      <h3 className="text-sm font-bold mb-2">Recherche</h3>
      <input
        type="text"
        placeholder="Rechercher un produit..."
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>

    {/* Prix */}
    <div>
      <h3 className="text-sm font-bold mb-2">Prix</h3>
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>

    {/* Marques */}
    <div>
      <h3 className="text-sm font-bold mb-2">Marques</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded"
          />
          <span className="text-sm">Marque 1</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded"
          />
          <span className="text-sm">Marque 2</span>
        </label>
      </div>
    </div>

    {/* État */}
    <div>
      <h3 className="text-sm font-bold mb-2">État</h3>
      <select className="w-full px-3 py-2 border rounded-md">
        <option value="" disabled>Sélectionner l'état</option>
        <option value="Neuf">Neuf</option>
        <option value="Occasion">Occasion</option>
      </select>
    </div>

    {/* Localisation */}
    <div>
      <h3 className="text-sm font-bold mb-2">Localisation</h3>
      <select className="w-full px-3 py-2 border rounded-md">
        <option value="" disabled>Sélectionner la ville</option>
        <option value="Paris">Paris</option>
        <option value="Lyon">Lyon</option>
        <option value="Marseille">Marseille</option>
      </select>
    </div>

    {/* Disponibilité */}
    <div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="rounded"
        />
        <span className="text-sm">Uniquement les produits disponibles</span>
      </label>
    </div>

    {/* Reset button */}
    <button
      onClick={() => {}}
      className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors"
    >
      Réinitialiser les filtres
    </button>
  </div>
);

const Navigation = ({ showMobileMenu, setShowMobileMenu }) => (
  <div className="flex items-center justify-between p-4 border-b bg-white">
    <div className="lg:hidden">
      <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2">
        {showMobileMenu ? <X className="w-6 h-6" /> : <Filter className="w-6 h-6" />}
      </button>
    </div>
    <div className={`${showMobileMenu ? 'absolute top-16 left-0 right-0 bg-white border-b z-50' : 'hidden'} lg:flex lg:items-center lg:gap-6`}>
      <span className="block p-4 lg:p-0 font-bold border-b-2 border-black">Produits</span>
      <span className="block p-4 lg:p-0 text-gray-600">Tous les vendeurs</span>
      <span className="block p-4 lg:p-0 text-gray-600">Vendeurs régionaux</span>
    </div>
  </div>
);

const Sidebar = ({ showFilters, setShowFilters }) => (
  <div className={`${showFilters ? 'fixed inset-0 z-50 bg-white' : 'hidden'} lg:block lg:relative lg:w-64 lg:bg-white lg:p-4 lg:border-r`}>
    <div className="flex items-center justify-between p-4 lg:hidden">
      <h2 className="text-lg font-bold">Filtres</h2>
      <button onClick={() => setShowFilters(false)}>
        <X className="w-6 h-6" />
      </button>
    </div>
    
    <div className="p-4 lg:p-0 overflow-y-auto max-h-[calc(100vh-5rem)]">
      <Filters />
    </div>
  </div>
);

const Store = () => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { 
    products, 
    loading, 
    error, 
    getAllProducts, 
    getProductsByCategory
  } = useProducts();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleProductClick = (productId) => {
    router.push(`/SingleProductPage/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-50">
      <Navigation showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />

      <div className="lg:flex">
        <Sidebar showFilters={showFilters} setShowFilters={setShowFilters} />

        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg"
            >
              <Filter className="w-4 h-4" />
              Filtres
            </button>
            <div className="flex items-center gap-2">
              <span>Trier</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {loading ? <div>Chargement des produits...</div> : 
          (error ? <div>Erreur: {error}</div> : 
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow-sm" onClick={() => handleProductClick(product.id)}>
                <div className="relative pb-[100%]">
                  <img 
                    src={product.photos?.[0] || Clavier.src} 
                    alt={product.nom} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm mt-2 mb-2 line-clamp-2">{product.nom}</h3>
                <div className="font-bold">{product.prix}€</div>
              </div>
            ))}
          </div>
          )}

          <div className="hidden lg:flex justify-between items-center mt-4">
            <h3 className="text-sm">{`${products.length} produits trouvés`}</h3>
          </div>
        </div>
      </div>

      <button className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
       
        <span className="hidden sm:inline">Message</span>
      </button>
    </div>
  );
};

export default Store;
