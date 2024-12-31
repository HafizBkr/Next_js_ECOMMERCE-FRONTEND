import React from 'react';
import { Star, MessageSquare, Info, Camera } from 'lucide-react';

const Store = () => {
  return (
    <div className="max-w-7xl mx-auto bg-gray-50">
      {/* Top Navigation */}
      <div className="flex items-center gap-6 p-4 border-b bg-white">
        <span className="font-bold border-b-2 border-black">Products</span>
        <span className="text-gray-600">All suppliers</span>
        <span className="text-gray-600">Regional supplies</span>
        <div className="flex items-center gap-1 text-gray-600">
          <span className="text-blue-600">✓</span>
          Verified manufacturers
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white p-4 border-r">
          <h2 className="text-lg font-bold mb-4">Filters</h2>

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
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Featured Product */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img src="/api/placeholder/40/40" alt="Company" className="w-10 h-10" />
                <div>
                  <h2 className="font-medium">Ancreu Technology Co., Ltd.</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-blue-600">✓</span>
                    <span>10 Years Manufacturer for Keyboard</span>
                    <img src="/api/placeholder/20/20" alt="ISO" className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1 border rounded">Chat now</button>
                <button className="px-4 py-1 border rounded">Contact Supplier</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white p-4 rounded shadow-sm">
                  <img src="/api/placeholder/200/200" alt="Keyboard" className="w-full mb-2" />
                  <h3 className="text-sm mb-2">Mechanical Gaming Keyboard RGB</h3>
                  <div className="font-bold">$32.80-33.60</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm">Showing 10,000+ products from global suppliers for "mechanical keyboard"</h3>
              <div className="flex items-center gap-2">
                <span>Sort by relevance</span>
                <span className="bg-green-500 text-white px-2 py-0.5 text-xs rounded">New</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-lg overflow-hidden">
                  <div className="relative">
                    <img src="/api/placeholder/280/280" alt="Product" className="w-full" />
                    <button className="absolute bottom-2 right-2 bg-white p-1 rounded">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm mb-2">YG102 Mechanical keyboard RGB</h3>
                    <div className="font-bold mb-2">$33.00-36.00</div>
                    <div className="text-sm text-gray-500">Min. order: 20 pieces</div>
                    <div className="mt-4 flex justify-between">
                      <button className="px-4 py-1 border rounded">Add to cart</button>
                      <button className="px-4 py-1 border rounded">Chat now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        Messenger
      </button>
    </div>
  );
};

export default Store;