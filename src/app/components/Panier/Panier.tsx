
"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ArrowLeft, ShoppingBag, Shield, CreditCard } from 'lucide-react';
import Iphone from "@/app/public/images/iphonee.png"

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "APPLE iPhone 15 Plus 128 Go Noir",
      condition: "Très bon état - Reconditionné",
      price: 779.00,
      quantity: 1,
      image: Iphone.src,
      seller: "Alloccaz Store"
    },
    {
        id: 2,
        name: "APPLE iPhone 15 Plus 128 Go Noir",
        condition: "Très bon état - Reconditionné",
        price: 779.00,
        quantity: 1,
        image: Iphone.src,
        seller: "Alloccaz Store"
      },
      {
        id: 3,
        name: "APPLE iPhone 15 Plus 128 Go Noir",
        condition: "Très bon état - Reconditionné",
        price: 779.00,
        quantity: 1,
        image: Iphone.src,
        seller: "Alloccaz Store"
      },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header avec animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mon Panier
            </h1>
            <p className="text-gray-500 mt-1">{cartItems.length} article(s)</p>
          </div>
          <button className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Continuer mes achats</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                            {item.condition}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Vendeur: {item.seller}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-end mt-6">
                      <div className="flex items-center bg-gray-50 rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xl font-semibold">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-6">Récapitulatif</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="text-green-500 font-medium">Gratuite</span>
                </div>
                <div className="h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full py-4 font-medium mt-6 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl">
                  Passer la commande
                </button>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                  <Shield className="w-4 h-4" />
                  <span>Paiement 100% sécurisé</span>
                </div>
              </div>
            </motion.div>

            {/* Options de paiement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="font-semibold mb-4">Moyens de paiement acceptés</h3>
              <div className="grid grid-cols-4 gap-4">
                {['visa', 'mastercard', 'paypal', 'apple-pay'].map((payment) => (
                  <div key={payment} className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={`/${payment}-logo.png`} 
                      alt={payment}
                      className="w-full h-8 object-contain"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Garanties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {[
                {
                  icon: Shield,
                  title: "Garantie satisfait ou remboursé",
                  description: "30 jours pour changer d'avis"
                },
                {
                  icon: ShoppingBag,
                  title: "Livraison express",
                  description: "Livraison en 24/48h"
                },
                {
                  icon: CreditCard,
                  title: "Paiement sécurisé",
                  description: "Vos données sont protégées"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <item.icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;