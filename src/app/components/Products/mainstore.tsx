import React, { useState } from 'react';
import { Star, MessageSquare, Info, Camera, Menu, X, Filter, ChevronDown } from 'lucide-react';
import Clavier from "@/app/public/images/clavier.avif"

const Store = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const Filters = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="bg-orange-500 text-white text-xs px-1">New</span>
        <span className="text-sm">New</span>
        <Info className="w-4 h-4 text-gray-400" />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">☆</span>
          <span className="text-sm font-medium">Trade Assurance</span>
        </div>
        <p className="text-xs text-gray-500 ml-6">Protects your orders on Website.com</p>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-2">Supplier features</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-blue-600">✓</span>
            <span className="text-sm">Verified Supplier</span>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-blue-600">✓</span>
            <span className="text-sm">Verified Pro Supplier</span>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-gray-500">≤</span>
            <span className="text-sm">1h response time</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold">Merge results</h3>
          <span className="bg-green-500 text-white text-xs px-1 rounded">New</span>
        </div>
        <div className="mt-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Merge by supplier</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">Only the most relevant item from each supplier will be shown</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-2">Store reviews</h3>
        <p className="text-xs text-gray-500">Based on a 5-star rating system</p>
        <div className="space-y-1 mt-2">
          {['4.0 & up', '4.5 & up', '5.0'].map(rating => (
            <label key={rating} className="flex items-center gap-2">
              <input type="radio" name="rating" />
              <span className="text-sm">{rating}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-2">Categories</h3>
        <div className="text-sm text-blue-600 space-y-1">
          <div>Gaming Keyboards</div>
          <div>Keyboards</div>
          <div>Keycaps</div>
        </div>
      </div>
    </div>
  );

  const Navigation = () => (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="lg:hidden">
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2">
          {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <div className={`${showMobileMenu ? 'absolute top-16 left-0 right-0 bg-white border-b z-50' : 'hidden'} lg:flex lg:items-center lg:gap-6`}>
        <span className="block p-4 lg:p-0 font-bold border-b-2 border-black">Products</span>
        <span className="block p-4 lg:p-0 text-gray-600">All suppliers</span>
        <span className="block p-4 lg:p-0 text-gray-600">Regional supplies</span>
        <div className="flex items-center gap-1 p-4 lg:p-0 text-gray-600">
          <span className="text-blue-600">✓</span>
          Verified manufacturers
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`${showFilters ? 'fixed inset-0 z-50 bg-white' : 'hidden'} lg:block lg:relative lg:w-64 lg:bg-white lg:p-4 lg:border-r`}>
      <div className="flex items-center justify-between p-4 lg:hidden">
        <h2 className="text-lg font-bold">Filters</h2>
        <button onClick={() => setShowFilters(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="p-4 lg:p-0 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <h2 className="text-lg font-bold mb-4 hidden lg:block">Filters</h2>
        <Filters />
      </div>
    </div>
  );

  const products = [1, 2, 3, 4].map((item) => ({
    id: item,
    name: 'YG102 Mechanical keyboard RGB',
    price: '$33.00-36.00',
    minOrder: '20 pieces',
    image: Clavier.src
  }));

  return (
    <div className="max-w-7xl mx-auto bg-gray-50">
      <Navigation />

      <div className="lg:flex">
        <Sidebar />

        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="flex items-center gap-2">
              <span>Sort</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <img src="/api/placeholder/40/40" alt="Company" className="w-10 h-10" />
                <div>
                  <h2 className="font-medium">Ancreu Technology Co., Ltd.</h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-blue-600">✓</span>
                    <span>10 Years Manufacturer</span>
                    <img src="/api/placeholder/20/20" alt="ISO" className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 sm:flex-none px-4 py-1 border rounded">Chat now</button>
                <button className="flex-1 sm:flex-none px-4 py-1 border rounded">Contact</button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded shadow-sm">
                  <div className="relative pb-[100%]">
                    <img 
                      src={product.image} 
                      alt="Keyboard" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm mt-2 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="font-bold">{product.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="hidden lg:flex justify-between items-center mb-4">
              <h3 className="text-sm">10,000+ products from global suppliers</h3>
              <div className="flex items-center gap-2">
                <span>Sort by relevance</span>
                <span className="bg-green-500 text-white px-2 py-0.5 text-xs rounded">New</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden">
                  <div className="relative pb-[100%]">
                    <img 
                      src={product.image} 
                      alt="Product" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <button className="absolute bottom-2 right-2 bg-white p-1 rounded">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <div className="font-bold mb-2">{product.price}</div>
                    <div className="text-sm text-gray-500">Min. order: {product.minOrder}</div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <button className="flex-1 px-4 py-1 border rounded">Add to cart</button>
                      <button className="flex-1 px-4 py-1 border rounded">Chat now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline">Messenger</span>
      </button>
    </div>
  );
};

export default Store;