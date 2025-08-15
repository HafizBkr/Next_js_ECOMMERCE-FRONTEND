// /src/app/components/AdminLoginForm.tsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./input";
import { Divider } from "./Divider";
import useAdminAuth from "../../hooks/userAdminAuth"; // Correction de l'importation

export const AdminLoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error } = useAdminAuth(); // Utilisation du hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials = { email, password };
    await login(credentials); // Appel de la fonction de login
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Bienvenue
        </h1>
        <p className="text-gray-500">Heureux de vous revoir !</p>
      </div>
      <Divider />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="vous@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'email
        />
        <Input
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          required
          rightElement={
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Mise à jour du mot de passe
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
        {/* Affichage de l'erreur */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};
