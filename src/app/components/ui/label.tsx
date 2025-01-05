// src/app/components/ui/label.tsx

import React from "react";

const Label: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      {/* Conteneur principal */}
      <div className="relative bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-6">
        {/* Fond lumineux */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 blur-xl opacity-50 rounded-xl -z-10"></div>

        {/* Label customisé */}
        <label
          htmlFor="futuristic-input"
          className="block text-lg font-medium text-gray-300 mb-2 tracking-widest uppercase"
        >
          Votre nom :
        </label>

        {/* Champ de texte */}
        <input
          id="futuristic-input"
          type="text"
          placeholder="Entrez votre nom..."
          className="w-full p-4 text-gray-100 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-md placeholder-gray-500"
        />

        {/* Lignes animées pour un effet high-tech */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-2 left-2 w-[95%] h-[95%] border border-gray-700 rounded-xl animate-pulse"></div>
          <div className="absolute top-4 left-4 w-[90%] h-[90%] border border-gray-600 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Label;
