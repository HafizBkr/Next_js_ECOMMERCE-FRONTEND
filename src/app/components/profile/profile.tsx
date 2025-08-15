"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useGAuth";
import { useCommande } from "../../hooks/useCommande";
import Image from "next/image";
import {
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Shield,
  Truck,
  MapPin,
  Phone,
  Package,
} from "lucide-react";

const OrderStatus: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "en_attente":
        return "bg-yellow-100 text-yellow-800";
      case "confirmee":
        return "bg-green-100 text-green-800";
      case "annulee":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "en_attente":
        return "En attente";
      case "confirmee":
        return "Confirmée";
      case "annulee":
        return "Annulée";
      default:
        return status;
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
    >
      {getStatusText()}
    </span>
  );
};

const ModernProfile = () => {
  const router = useRouter();
  const {
    user,
    loading: authLoading,
    error: authError,
    fetchUserInfo,
    logout,
  } = useAuth();
  const {
    loading: commandesLoading,
    commandes,
    fetchCommandes,
  } = useCommande();

  useEffect(() => {
    if (!user) {
      fetchUserInfo().catch((err) => {
        if (err.message === "No JWT token found") {
          // router.push('/login');
        }
      });
    }
  }, [user, fetchUserInfo, router]);

  useEffect(() => {
    if (user) {
      fetchCommandes();
    }
  }, [user]);

  if (authLoading || commandesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (authError === "No JWT token found") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <Shield className="mx-auto w-16 h-16 text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connexion Requise</h2>
          <p className="text-gray-600 mb-6">
            Votre session a expiré. Veuillez vous reconnecter.
          </p>
          <button
            onClick={() => router.push("/login")}
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
    { label: "Points", value: user.points || 0 },
    { label: "Commandes", value: commandes?.length || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 mt-20">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* User Info Section */}
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
                    <div
                      key={stat.label}
                      className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info Section */}
              <div className="border-t">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Informations Personnelles
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span>
                        {user.address}, {user.residence_city},{" "}
                        {user.residence_country}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span>{user.phone_number}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Dernières Commandes</h3>
                {commandes && commandes.length > 0 ? (
                  <div className="space-y-4">
                    {commandes.reverse().map((commande) => (
                      <div key={commande.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <span className="text-sm text-gray-500">
                              N° Commande:
                            </span>
                            <p className="font-medium">
                              {commande.numero_commande}
                            </p>
                          </div>
                          <OrderStatus status={commande.status} />
                        </div>
                        {commande.produits.map((produit, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4 mt-3 p-3 bg-gray-50 rounded-lg"
                          >
                            {produit.photos && produit.photos[0] && (
                              <Image
                                src={
                                  produit.photos[0]
                                    .replace("{", "")
                                    .split(",")[0]
                                }
                                alt={produit.nom}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <h4 className="font-medium">{produit.nom}</h4>
                              <div className="text-sm text-gray-500">
                                Quantité: {produit.quantite} | Prix:{" "}
                                {produit.prix_unite}€
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="mt-4 flex justify-between items-center text-sm">
                          <span className="text-gray-500">
                            {new Date(commande.created_at).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </span>
                          <span className="font-medium">
                            Total: {commande.montant_total}€
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <Package className="mx-auto w-12 h-12 text-gray-400 mb-2" />
                    Aucune commande pour le moment
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="p-4 rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <div className="font-medium mb-2">🌟 Points de fidélité</div>
              <div className="text-white/80">
                Vous avez actuellement {user.points || 0} points
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Actions Rapides</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: CreditCard, label: "Payer" },
                    { icon: Truck, label: "Livraison" },
                    { icon: Bell, label: "Alertes" },
                    { icon: Settings, label: "Réglages" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-2"
                    >
                      <action.icon className="w-6 h-6 text-gray-700" />
                      <span className="text-sm font-medium">
                        {action.label}
                      </span>
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
