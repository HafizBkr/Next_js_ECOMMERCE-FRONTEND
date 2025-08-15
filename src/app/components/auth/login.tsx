import React from "react";
import { GoogleButton } from "./GoogleButton";
import { useAuth } from "../../hooks/useGAuth"; // Assurez-vous que le chemin est correct

export const LoginForm: React.FC = () => {
  const { initiateGoogleAuth, loading, error } = useAuth();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Bienvenue
        </h1>
        <p className="text-gray-500">Heureux de vous revoir !</p>
      </div>

      {/* Bouton Google pour initier l'authentification */}
      <GoogleButton onClick={initiateGoogleAuth} disabled={loading} />

      {/* Affichage des erreurs (le cas échéant) */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
