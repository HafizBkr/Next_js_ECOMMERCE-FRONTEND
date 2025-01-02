import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleButton } from './GoogleButton';
import { Input } from './input';
import { Divider } from './Divider';

interface LoginFormProps {
  onToggle: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Bienvenue
        </h1>
        <p className="text-gray-500">Heureux de vous revoir !</p>
      </div>

      <GoogleButton />
      <Divider />

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Email"
          type="email"
          placeholder="vous@example.com"
          required
        />

        <Input
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
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

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Se connecter
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Vous n'avez pas de compte ?{' '}
        <button
          type="button"
          className="font-semibold text-blue-600 hover:text-blue-500"
          onClick={onToggle}
        >
          S'inscrire
        </button>
      </p>
    </div>
  );
};
