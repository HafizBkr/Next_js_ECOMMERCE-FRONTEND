import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { GoogleButton } from "./GoogleButton";
import { Input } from "./input";
import { Divider } from "./Divider";

interface RegisterFormProps {
  onToggle?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Créer un compte
        </h1>
        <p className="text-gray-500">Commencez votre voyage avec nous</p>
      </div>

      <GoogleButton />
      <Divider />

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Nom complet"
          type="text"
          placeholder="John Doe"
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="vous@example.com"
          required
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
        />

        <Input
          label="Confirmer le mot de passe"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          S&apos;inscrire
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Vous avez déjà un compte ?&nbsp;
        <button
          type="button"
          className="font-semibold text-blue-600 hover:text-blue-500"
          onClick={onToggle}
        >
          Se connecter
        </button>
      </p>
    </div>
  );
};
