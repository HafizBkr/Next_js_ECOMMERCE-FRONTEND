'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../hooks/useGAuth';
import Image from 'next/image';
import { 
  User, CreditCard, Bell, Settings, LogOut, 
  Shield, Truck, MapPin, Phone 
} from 'lucide-react';

const ModernProfile = () => {
  const router = useRouter();
  const { user, loading, error, fetchUserInfo, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      fetchUserInfo().catch((err) => {
        if (err.message === 'No JWT token found') {
          // router.push('/login');
        }
      });
    }
  }, [user, fetchUserInfo, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error === 'No JWT token found') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <Shield className="mx-auto w-16 h-16 text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connexion Requise</h2>
          <p className="text-gray-600 mb-6">Votre session a expiré. Veuillez vous reconnecter.</p>
          <button 
            onClick={() => router.push('/login')}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Se Connecter
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const stats = [
    { label: 'Points', value: 0 },
    { label: 'Commandes', value: '0' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 mt-20">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  {user.profile_picture ? (
                    <Image 
                      src={user.profile_picture} 
                      alt={`${user.first_name}'s profile`} 
                      width={80} 
                      height={80} 
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                      {user.first_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">{`${user.first_name} ${user.last_name}`}</h2>
                    <p className="text-gray-600">{user.email}</p>
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
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Informations Personnelles</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span>{user.address}, {user.residence_city}, {user.residence_country}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span>{user.phone_number}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Dernières Commandes</h3>
                <div className="text-center text-gray-500">
                  Aucune commande pour le moment
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <div className="font-medium mb-2">🌟 Points de fidélité</div>
              <div className="text-white/80">
                Vous avez actuellement {user.points} points
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

            <button
              onClick={logout}
              className="w-full p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 text-gray-700"
            >
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