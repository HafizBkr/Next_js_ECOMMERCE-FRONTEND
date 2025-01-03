"use client"
import React, { useState } from 'react';
import { 
  User, 
  CreditCard, 
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  Truck
} from 'lucide-react';

const ModernProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const stats = [
    { label: 'Commandes', value: '24' },
    { label: 'Points', value: '2,850' },
    { label: 'Avis', value: '12' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-20">
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    T
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Thomas Durant</h2>
                    <p className="text-gray-600">thomas.durant@email.com</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t">
                <nav className="divide-y">
                  {[
                    { icon: User, label: 'Informations Personnelles' },
                    { icon: CreditCard, label: 'Paiement' },
                    { icon: Bell, label: 'Notifications' },
                    { icon: Shield, label: 'Sécurité' },
                  ].map((item) => (
                    <button key={item.label} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">{item.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Dernières Commandes */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Dernières Commandes</h3>
                <div className="space-y-4">
                  {[1, 2].map((order) => (
                    <div key={order} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Truck className="w-10 h-10 text-blue-500" />
                        <div>
                          <div className="font-medium">Commande #0{order}234</div>
                          <div className="text-sm text-gray-600">En cours de livraison</div>
                        </div>
                      </div>
                      <button className="text-blue-500 hover:text-blue-600">
                        Voir détails
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Side Content */}
          <div className="space-y-6">
            <div className="p-4 rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <div className="font-medium mb-2">🌟 Premium activated</div>
              <div className="text-white/80">
                Profitez de la livraison gratuite et des réductions exclusives
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Actions Rapides</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: CreditCard, label: 'Payer' },
                    { icon: Truck, label: 'Livraison' },
                    { icon: Bell, label: 'Alertes' },
                    { icon: Settings, label: 'Réglages' },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-2"
                    >
                      <action.icon className="w-6 h-6 text-gray-700" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 text-gray-700">
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernProfile;