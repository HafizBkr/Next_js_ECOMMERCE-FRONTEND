import React, { useState } from "react";

const FuturisticTextarea = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      {/* Fond lumineux */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 blur-xl opacity-50 rounded-xl"></div>

      {/* Conteneur principal */}
      <div className="relative bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-4">
        <label
          htmlFor="futuristic-textarea"
          className="block text-lg font-medium text-gray-300 mb-2 tracking-wider uppercase"
        >
          Votre message :
        </label>
        <textarea
          id="futuristic-textarea"
          value={value}
          onChange={handleChange}
          placeholder="Tapez ici..."
          className="w-full h-32 p-4 text-gray-100 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none shadow-md placeholder-gray-500"
        />
        <div className="text-right text-sm text-gray-500 mt-2">
          {value.length} caractères
        </div>
      </div>

      {/* Lignes animées pour un effet high-tech */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-2 left-2 w-[95%] h-[95%] border border-gray-700 rounded-xl animate-pulse"></div>
        <div className="absolute top-4 left-4 w-[90%] h-[90%] border border-gray-600 rounded-xl"></div>
      </div>
    </div>
  );
};

export default FuturisticTextarea;
